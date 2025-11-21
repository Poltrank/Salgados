// Serviço desativado temporariamente para correção de compatibilidade com Vercel.
// A funcionalidade de IA foi removida do App.tsx.

export const getPartySuggestion = async (
  guestCount: number,
  partyType: string,
  durationHours: number
): Promise<{ text: string; recommendedAmount: number } | null> => {
  // Retorna nulo imediatamente para não causar erro
  return null;
};