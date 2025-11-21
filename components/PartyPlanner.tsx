import React, { useState } from 'react';
import { getPartySuggestion } from '../services/geminiService';
import { Loader2, PartyPopper, Sparkles } from 'lucide-react';

interface PartyPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartyPlanner: React.FC<PartyPlannerProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState(20);
  const [duration, setDuration] = useState(4);
  const [type, setType] = useState('Aniversário Infantil');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; recommendedAmount: number } | null>(null);

  if (!isOpen) return null;

  const handlePlan = async () => {
    setLoading(true);
    const suggestion = await getPartySuggestion(guests, type, duration);
    setResult(suggestion);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative border-4 border-brand-yellow">
        
        {/* Header */}
        <div className="bg-brand-red p-6 text-white text-center">
          <h2 className="text-2xl font-bold font-heading flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-yellow" />
            Consultor de Festas IA
          </h2>
          <p className="text-white/90 text-sm mt-2">Não sabe quanto pedir? O Sr. Chefão ajuda!</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {!result ? (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Número de Convidados</label>
                <input 
                  type="number" 
                  value={guests} 
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Duração (horas)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={duration} 
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-brand-orange"
                />
                <div className="text-right text-sm text-gray-500 font-bold">{duration} horas</div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Evento</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none bg-white"
                >
                  <option>Aniversário Infantil</option>
                  <option>Happy Hour</option>
                  <option>Casamento</option>
                  <option>Reunião de Empresa</option>
                </select>
              </div>

              <button 
                onClick={handlePlan}
                disabled={loading}
                className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-700 transition flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Calcular Quantidade'}
              </button>
            </>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-yellow-50 p-4 rounded-xl border-2 border-brand-yellow">
                <div className="flex items-center gap-2 mb-2 text-brand-orange font-bold">
                  <PartyPopper />
                  <span>Sugestão do Chefão:</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{result.text}</p>
              </div>
              
              <div className="bg-brand-red text-white p-4 rounded-xl text-center">
                <span className="block text-sm opacity-90">Quantidade Recomendada</span>
                <span className="text-4xl font-bold font-heading">{result.recommendedAmount} Salgados</span>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="w-full border-2 border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                Calcular Novamente
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};