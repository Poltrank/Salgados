import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Save, X, Image as ImageIcon, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProductEditorProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ product, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Product | null>(null);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Detecção robusta de links que não funcionam
  const isGoogleLink = formData.image.includes('google.com') || 
                       formData.image.includes('goo.gl') || 
                       formData.image.includes('drive.google') || 
                       formData.image.includes('photos.app.goo.gl');
  
  const isInvalidFormat = !isGoogleLink && 
                          formData.image.length > 10 && 
                          !formData.image.match(/\.(jpeg|jpg|gif|png|webp)$/i) && 
                          !formData.image.includes('images.unsplash.com'); // Exceção para unsplash

  const hasError = isGoogleLink; // Bloqueia principalmente links do Google que são o erro mais comum

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-heading font-bold text-lg text-gray-800">Editar Produto</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Image Preview */}
          <div className="flex flex-col items-center mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase mb-2 self-start">Como vai ficar no site:</span>
            <div className="w-full h-48 rounded-xl overflow-hidden border-4 border-gray-100 relative bg-gray-50 shadow-inner">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-full object-cover" 
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=Link+Quebrado+ou+Inválido')} 
              />
              {hasError && (
                <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center text-white font-bold text-center p-4">
                  Link Inválido!<br/>A imagem não vai aparecer.
                </div>
              )}
            </div>
          </div>

          {/* Link Input Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
               <p className="font-bold text-blue-900 flex items-center gap-2 mb-2 text-sm">
                 <ExternalLink size={16} />
                 Siga estes passos para funcionar:
               </p>
               <ol className="list-decimal ml-5 space-y-1 text-sm text-blue-800">
                 <li>Acesse <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-700">Postimages.org</a></li>
                 <li>Envie sua foto lá.</li>
                 <li>Copie o <strong>"Link direto"</strong> (termina em .jpg/.png).</li>
                 <li>Cole abaixo.</li>
               </ol>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cole o Link Direto aqui</label>
            <div className="relative">
                <ImageIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                type="text" 
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className={`w-full p-3 pl-10 border-2 rounded-lg focus:outline-none text-sm font-mono ${hasError ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 focus:border-brand-orange'}`}
                placeholder="https://..."
                />
            </div>
            
            {/* Alerta de Erro Específico */}
            {isGoogleLink && (
              <div className="mt-2 text-red-600 text-xs font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle size={12} />
                Links do Google/Drive NÃO funcionam em sites. Use o Postimages.
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preço (R$)</label>
                <input 
                type="number" 
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Qtd/Descrição Curta</label>
                <input 
                type="text" 
                value={formData.servingSize || ''}
                onChange={(e) => handleChange('servingSize', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:outline-none"
                placeholder="Ex: 100 unidades"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome do Produto</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição Detalhada</label>
            <textarea 
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:outline-none"
            />
          </div>

        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-3 text-gray-600 font-bold hover:bg-gray-200 rounded-lg text-sm">
                Cancelar
            </button>
            <button 
                onClick={() => onSave(formData)}
                disabled={hasError}
                className={`px-6 py-3 font-bold rounded-lg flex items-center gap-2 text-sm transition-all ${
                  hasError 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-105'
                }`}
            >
                {hasError ? <AlertTriangle size={18} /> : <Save size={18} />}
                {hasError ? 'Corrija o Link' : 'Salvar Alterações'}
            </button>
        </div>
      </div>
    </div>
  );
};