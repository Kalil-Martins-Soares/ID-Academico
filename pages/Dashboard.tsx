import React, { useState } from 'react';
import { useAuth } from '../App';
import DigitalID from '../components/DigitalID';
import { StudentStatus } from '../types';
import { MessageCircle, X, Send, AlertCircle } from 'lucide-react';
import { getStudentHelp } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
      {role: 'bot', text: 'Olá! Sou o assistente virtual da UFPI. Como posso ajudar com sua carteira hoje?'}
  ]);
  const [input, setInput] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  if (!user) return <div>Carregando...</div>;

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setLoadingAi(true);

    const context = `Aluno: ${user.fullName}, Status: ${user.status}, Validade: ${user.validUntil}`;
    const response = await getStudentHelp(userMsg, context);

    setMessages(prev => [...prev, {role: 'bot', text: response}]);
    setLoadingAi(false);
  };

  // Helper to get first name
  const firstName = user.fullName.split(' ')[0];

  return (
    <div className="space-y-6">
      
      {/* Welcome Header */}
      <div className="flex flex-col pt-2 pb-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Olá, {firstName}! 👋</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span className="font-medium text-[#005CA9] dark:text-blue-400">{user.course}</span>
            <span>•</span>
            <span>{user.enrollmentId}</span>
        </div>
      </div>

      {/* Status Banner */}
      {user.status === StudentStatus.ACTIVE ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-start gap-3 transition-colors">
             <div className="bg-green-100 dark:bg-green-800 p-1 rounded-full"><CheckCircleIcon className="text-green-600 dark:text-green-300 w-4 h-4" /></div>
             <div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">Documento Regular</p>
                <p className="text-xs text-green-600 dark:text-green-400">Válido em todo território nacional.</p>
             </div>
        </div>
      ) : (
         <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-start gap-3 transition-colors">
             <AlertCircle className="text-amber-600 dark:text-amber-400 w-5 h-5" />
             <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">Atenção Necessária</p>
                <p className="text-xs text-amber-600 dark:text-amber-500">Sua carteira precisa de renovação ou verificação.</p>
             </div>
        </div>
      )}

      {/* The Digital ID Card */}
      <div className="py-2">
        <DigitalID student={user} />
      </div>

      {/* AI Assistant FAB */}
      <button 
        onClick={() => setShowChat(true)}
        className="fixed bottom-24 right-6 bg-[#005CA9] dark:bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all z-40 flex items-center gap-2"
      >
        <MessageCircle size={24} />
        <span className="font-semibold text-sm pr-1">Dúvidas?</span>
      </button>

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white dark:bg-gray-800 w-full max-w-sm h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up transition-colors">
              
              {/* Chat Header */}
              <div className="bg-[#005CA9] dark:bg-blue-700 p-4 flex justify-between items-center text-white">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-semibold">CarteiraBot</span>
                 </div>
                 <button onClick={() => setShowChat(false)}><X size={20}/></button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
                  {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                              m.role === 'user' 
                              ? 'bg-[#005CA9] dark:bg-blue-600 text-white rounded-br-none' 
                              : 'bg-white dark:bg-gray-800 border dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-bl-none shadow-sm'
                          }`}>
                             {m.text}
                          </div>
                      </div>
                  ))}
                  {loadingAi && (
                      <div className="flex justify-start">
                          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-3 rounded-xl rounded-bl-none shadow-sm text-gray-400 dark:text-gray-500 text-xs italic">
                              Digitando...
                          </div>
                      </div>
                  )}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex gap-2">
                  <input 
                    className="flex-1 bg-gray-700 dark:bg-gray-900 text-white placeholder-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Pergunte sobre renovação, pagamento..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} disabled={loadingAi} className="bg-[#005CA9] dark:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50">
                     <Send size={18} />
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Simple icon component helper
const CheckCircleIcon = ({className}: {className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
)

export default Dashboard;