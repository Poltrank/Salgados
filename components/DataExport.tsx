import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { storageService } from '../services/storage';
import { Copy, Check, X, FileJson } from 'lucide-react';

interface DataExportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataExport: React.FC<DataExportProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const products = storageService.getProducts();
      // Formata os dados como uma string JSON bonita, pronta para ser colada no arquivo constants.ts
      // Removemos as aspas das chaves para parecer mais com código JS/TS se necessário, 
      // mas JSON puro é mais seguro para validar. Vamos gerar um formato fácil de copiar.
      const jsonString = JSON.stringify(products, null, 2);
      setCode(jsonString);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-brand-dark p-6 border-b border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-white font-heading text-xl flex items-center gap-2">
                <FileJson className="text-brand-yellow" />
                Salvar Alterações para Todos
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Para que seus clientes vejam as fotos novas, siga os passos abaixo.
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto bg-gray-50">
          <ol className="list-decimal ml-5 space-y-3 mb-6 text-gray-700">
            <li>Você editou os produtos no seu computador.</li>
            <li>Clique no botão <strong>"Copiar Código"</strong> abaixo.</li>
            <li>Vá no chat onde estamos conversando e <strong>Cole (Ctrl+V)</strong> esse código.</li>
            <li>Me peça: "Atualize o site com esses novos produtos".</li>
          </ol>

          <div className="relative">
            <textarea 
              readOnly
              value={code}
              className="w-full h-64 p-4 bg-gray-800 text-green-400 font-mono text-xs rounded-xl focus:outline-none resize-none shadow-inner"
            />
            <button 
              onClick={handleCopy}
              className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-brand-dark hover:bg-gray-100'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copiado!' : 'Copiar Código'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};