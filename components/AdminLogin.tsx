import React, { useState } from 'react';
import { Lock, Unlock, X } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = () => {
    // Simple hardcoded password for demonstration
    if (password === 'chefao123') {
      onLogin();
      onClose();
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        
        <div className="bg-brand-dark p-6 text-center">
          <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark">
            <Lock size={32} />
          </div>
          <h2 className="text-white font-heading text-xl">Área Restrita</h2>
          <p className="text-gray-400 text-sm">Acesso exclusivo Sr. Chefão</p>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Senha de Acesso</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-brand-red focus:outline-none"
              placeholder="Digite a senha..."
            />
            {error && <p className="text-red-500 text-sm mt-2 font-bold">Senha incorreta!</p>}
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-brand-red text-white font-bold py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <Unlock size={18} />
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};