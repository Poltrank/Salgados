import { GoogleGenAI, Type } from "@google/genai";

export const getPartySuggestion = async (
  guestCount: number,
  partyType: string,
  durationHours: number
): Promise<{ text: string; recommendedAmount: number } | null> => {
  
  // @ts-ignore
  const apiKey = process.env.API_KEY;

  // Se não tiver chave, aborta silenciosamente sem travar o site
  if (!apiKey) {
    console.warn("API Key não configurada. A IA não será executada.");
    // Retornamos um fallback simples para o usuário não ficar sem resposta se a IA falhar por falta de chave
    return {
      text: "Não conseguimos conectar com o Assistente IA no momento. Como regra geral, recomendamos calcular de 12 a 15 salgados por pessoa para uma festa de 4 horas.",
      recommendedAmount: guestCount * 15
    };
  }

  try {
    // @ts-ignore
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I am planning a party. 
      Guests: ${guestCount}. 
      Type: ${partyType}. 
      Duration: ${durationHours} hours.
      I am ordering savory snacks (salgadinhos) like coxinhas, kibes, etc.
      Suggest a mix of products and calculate the total amount of snacks I should order to ensure everyone is fed.
      Be fun and helpful. The company name is "Sr. Chefão Salgados".
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendationText: {
              type: Type.STRING,
              description: "A friendly suggestion paragraph in Portuguese (PT-BR) describing the mix of snacks.",
            },
            totalQuantity: {
              type: Type.NUMBER,
              description: "The total recommended number of snack units.",
            }
          },
          required: ["recommendationText", "totalQuantity"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    const data = JSON.parse(text);
    
    return {
      text: data.recommendationText,
      recommendedAmount: data.totalQuantity
    };

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return null;
  }
};