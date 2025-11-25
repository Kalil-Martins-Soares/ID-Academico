import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#005CA9] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          {/* Updated: UFPI Logo Area */}
          {/* 
             ASSET INSTRUCTION: 
             To use your local UFPI logo file:
             1. Place your image in a public folder (e.g., /public/assets/logo.png) 
             2. Or import it at the top: import ufpiLogo from '../assets/ufpi_logo.png';
             3. Change src below to: src={ufpiLogo} or src="/assets/logo.png"
          */}
          <div className="mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/02/Bras%C3%A3o_da_UFPI.png" 
              alt="UFPI Logo" 
              className="h-32 w-auto object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = 'https://via.placeholder.com/100x120.png?text=UFPI';
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Bem-vindo à UFPI</h1>
          <p className="text-gray-500 text-center text-sm mt-2">Identidade Digital Estudantil</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Institucional</label>
            {/* Updated: White text on dark background for better contrast/usability per request */}
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#005CA9] focus:border-transparent outline-none transition"
              placeholder="aluno@ufpi.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            {/* Updated: White text on dark background */}
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#005CA9] focus:border-transparent outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#005CA9] hover:bg-[#004a8c] text-white font-semibold py-3 rounded-lg transition-colors shadow-lg mt-4"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Novo por aqui? 
            <button onClick={() => navigate('/onboarding')} className="text-[#005CA9] font-semibold ml-1 hover:underline">
              Criar conta
            </button>
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
           {/* Updated: Removed Year */}
           <p className="text-xs text-center text-gray-400">Protótipo de Engenharia</p>
        </div>
      </div>
    </div>
  );
};

export default Login;