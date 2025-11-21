import { GoogleGenAI, Type } from "@google/genai";

// Removemos a inicialização global que travava o site
// A conexão com a IA agora só acontece quando o usuário clica no botão

export const getPartySuggestion = async (
  guestCount: number,
  partyType: string,
  durationHours: number
): Promise<{ text: string; recommendedAmount: number } | null> => {
  
  let apiKey = '';

  // 1. Tentativa Segura de pegar a chave
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      apiKey = process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("Ambiente sem suporte a variaveis de processo");
  }

  // 2. Se não tiver chave, aborta silenciosamente sem travar o site
  if (!apiKey) {
    console.error("API Key não configurada. A IA não será executada.");
    return null;
  }

  try {
    // 3. Inicializa a IA somente no momento do clique
    const ai = new GoogleGenAI({ apiKey });

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