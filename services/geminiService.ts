import { GoogleGenAI, Type } from "@google/genai";

// Função segura para obter a API Key sem quebrar o site se o ambiente não tiver suporte a process.env
const getApiKey = () => {
  try {
    // Verifica se process existe antes de tentar acessar
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("Ambiente não suporta process.env diretamente");
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const getPartySuggestion = async (
  guestCount: number,
  partyType: string,
  durationHours: number
): Promise<{ text: string; recommendedAmount: number } | null> => {
  
  // Se não tiver chave configurada, retorna erro silencioso para não travar
  if (!apiKey) {
    console.error("API Key não configurada no ambiente. A IA não responderá.");
    // Retornar um mock ou null
    return null;
  }

  try {
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