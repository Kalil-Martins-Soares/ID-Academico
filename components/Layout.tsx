import React from 'react';
import { Home, User, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location.pathname === path ? 'text-[#005CA9] dark:text-blue-400' : 'text-gray-400 dark:text-gray-500';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 min-h-screen shadow-2xl relative flex flex-col transition-colors duration-200">
        {/* Header */}
        <header className="px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-20 flex justify-between items-center transition-colors duration-200">
          <h1 className="font-bold text-[#005CA9] dark:text-blue-400 text-lg">ID Estudantil</h1>
          <button onClick={handleLogout} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 pb-24 overflow-y-auto dark:text-gray-200">
          {children}
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-6 py-4 flex justify-between items-center z-30 transition-colors duration-200">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`flex flex-col items-center gap-1 ${isActive('/dashboard')}`}
          >
            <Home size={24} />
            <span className="text-[10px] font-medium">Início</span>
          </button>
          
           <button 
            onClick={() => navigate('/renew')}
             className={`flex flex-col items-center gap-1 ${isActive('/renew')}`}
          >
            <CreditCard size={24} />
            <span className="text-[10px] font-medium">Renovar</span>
          </button>
          
           <button 
             onClick={() => navigate('/settings')}
             className={`flex flex-col items-center gap-1 ${isActive('/settings')}`}
          >
            <Settings size={24} />
            <span className="text-[10px] font-medium">Ajustes</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Layout;