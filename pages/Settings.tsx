import React, { useState } from 'react';
import { useAuth, useTheme } from '../App';
import { Moon, Sun, User, Bell, Globe, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Local state for other toggles
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Section */}
      <div className="pb-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ajustes</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure suas preferências do aplicativo.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm flex items-center gap-4 transition-colors">
        <img 
            src={user?.photoUrl || 'https://picsum.photos/200'} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-gray-500"
        />
        <div className="flex-1">
            <h3 className="font-bold text-gray-800 dark:text-white">{user?.fullName}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-300">{user?.email}</p>
            <button className="text-xs text-[#005CA9] dark:text-blue-300 font-medium mt-1 hover:underline">
                Editar Perfil
            </button>
        </div>
      </div>

      {/* Appearance Section */}
      <section>
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">Aparência</h3>
        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden transition-colors">
            <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-600 transition cursor-pointer" onClick={toggleTheme}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-orange-100 text-orange-600'}`}>
                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Modo Escuro</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${isDarkMode ? 'bg-[#005CA9] justify-end' : 'bg-gray-300 justify-start'}`}>
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
            </div>
        </div>
      </section>

      {/* General Settings */}
      <section>
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">Geral</h3>
        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden divide-y divide-gray-100 dark:divide-gray-600 transition-colors">
            
            {/* Notifications */}
            <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-600 transition cursor-pointer" onClick={() => setNotifications(!notifications)}>
                <div className="flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 p-2 rounded-lg">
                        <Bell size={20} />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Notificações</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${notifications ? 'bg-[#005CA9] justify-end' : 'bg-gray-300 justify-start'}`}>
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
            </div>

            {/* Language */}
            <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-600 transition cursor-pointer">
                <div className="flex items-center gap-3">
                     <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                        <Globe size={20} />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Idioma</span>
                </div>
                <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-sm text-gray-500 dark:text-gray-300 bg-transparent outline-none border-none text-right cursor-pointer"
                >
                    <option value="pt-BR" className="dark:bg-gray-800">Português (BR)</option>
                    <option value="en-US" className="dark:bg-gray-800">English (US)</option>
                </select>
            </div>
            
             {/* Account Security (Demo link) */}
             <div className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-600 transition cursor-pointer">
                <div className="flex items-center gap-3">
                     <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 p-2 rounded-lg">
                        <Shield size={20} />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Segurança da Conta</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </div>

        </div>
      </section>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors mt-4"
      >
        <LogOut size={20} />
        Sair do Aplicativo
      </button>

      <div className="text-center text-xs text-gray-400 py-4">
        Versão 1.0.0 (Demo)
      </div>
    </div>
  );
};

export default Settings;