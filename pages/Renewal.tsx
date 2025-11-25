import React, { useState } from 'react';
import { useAuth } from '../App';
import { Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Renewal: React.FC = () => {
    const { user, updateStudentData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    const handleRenew = () => {
        setLoading(true);
        // Mock payment and validation
        setTimeout(() => {
            if (user) {
                const nextYear = new Date();
                nextYear.setFullYear(nextYear.getFullYear() + 1);
                updateStudentData({
                    validUntil: nextYear.toISOString(),
                });
            }
            setLoading(false);
            setDone(true);
        }, 2000);
    };

    if (done) {
         return (
             <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={32}/>
                 </div>
                 <h2 className="text-2xl font-bold dark:text-white">Renovado com Sucesso!</h2>
                 <p className="text-gray-500 dark:text-gray-400 max-w-xs">Sua carteira agora é válida até o próximo ano letivo.</p>
                 <button onClick={() => navigate('/dashboard')} className="mt-4 px-6 py-2 bg-[#005CA9] text-white rounded-lg hover:bg-blue-700">Voltar</button>
             </div>
         )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Renovação Anual</h2>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border dark:border-gray-600 shadow-sm space-y-4 transition-colors">
                <div className="flex justify-between items-center border-b dark:border-gray-600 pb-4">
                    <span className="text-gray-600 dark:text-gray-300">Status Atual</span>
                    <span className="font-bold text-[#005CA9] dark:text-blue-400">{user?.status === 'ACTIVE' ? 'Ativo' : 'Pendente'}</span>
                </div>
                <div className="flex justify-between items-center border-b dark:border-gray-600 pb-4">
                     <span className="text-gray-600 dark:text-gray-300">Vencimento Atual</span>
                     <span className="font-mono text-sm dark:text-gray-200">{user ? new Date(user.validUntil).toLocaleDateString() : '-'}</span>
                </div>
                 <div className="flex justify-between items-center">
                     <span className="text-gray-600 dark:text-gray-300">Nova Validade</span>
                     <span className="font-bold text-green-600 dark:text-green-400">Dez/2026</span>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex gap-3 text-sm text-blue-800 dark:text-blue-200">
                <Calendar className="shrink-0" size={20} />
                <p>A renovação requer apenas a confirmação dos dados e o pagamento da taxa anual de manutenção de R$ 15,00.</p>
            </div>

            <button 
                onClick={handleRenew}
                disabled={loading}
                className="w-full bg-[#005CA9] hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md transition-all flex justify-center"
            >
                {loading ? 'Processando Pagamento...' : 'Pagar e Renovar Agora'}
            </button>
        </div>
    );
};

export default Renewal;