import React, { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { StudentStatus } from '../types';
import { Upload, CheckCircle, CreditCard, Loader2, Camera, Lock } from 'lucide-react';

enum Step {
  PERSONAL_INFO,
  DOCUMENTS,
  PAYMENT,
  SUCCESS
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.PERSONAL_INFO);
  const { updateStudentData, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    enrollment: '',
    email: '',
    password: '' // Added password field state
  });

  // Simulated Document Upload State
  const [uploads, setUploads] = useState({
    photo: null as string | null,
    proof: null as string | null,
    idCard: null as string | null
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof uploads) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploads(prev => ({ ...prev, [type]: url }));
    }
  };

  const nextStep = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
        setIsLoading(false);
        setStep(prev => prev + 1);
    }, 800);
  };

  const handleFinish = () => {
    // FIREBASE INTEGRATION NOTE:
    // In a real application, you would create the user in Firebase Auth here:
    // await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    // Then save the additional metadata to Firestore:
    // await setDoc(doc(db, "students", user.uid), { ...studentData });

    login(formData.email);
    updateStudentData({
      fullName: formData.name,
      course: formData.course,
      enrollmentId: formData.enrollment,
      photoUrl: uploads.photo || 'https://picsum.photos/200',
      status: StudentStatus.ACTIVE,
      validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      documentsUploaded: true
    });
    navigate('/dashboard');
  };

  // Common input style class for white text on dark background
  const inputClass = "w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#005CA9] outline-none";

  // --- Render Steps directly to fix focus loss bugs ---

  const renderPersonalInfo = () => (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800">Dados Pessoais</h2>
      <p className="text-gray-500 text-sm">Crie sua conta para acessar a carteira digital.</p>
      
      <div className="space-y-3">
        <input 
          placeholder="Nome Completo" 
          className={inputClass}
          value={formData.name}
          onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
        />
        <input 
          placeholder="Curso (Ex: Eng. Elétrica)" 
          className={inputClass}
           value={formData.course}
          onChange={e => setFormData(prev => ({...prev, course: e.target.value}))}
        />
        <input 
          placeholder="Matrícula" 
          className={inputClass}
           value={formData.enrollment}
          onChange={e => setFormData(prev => ({...prev, enrollment: e.target.value}))}
        />
        <input 
          placeholder="Email Institucional" 
          type="email"
          className={inputClass}
           value={formData.email}
          onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
        />
        {/* Added Password Field */}
        <div className="relative">
            <input 
              placeholder="Senha (mínimo 6 caracteres)" 
              type="password"
              className={inputClass}
              value={formData.password}
              onChange={e => setFormData(prev => ({...prev, password: e.target.value}))}
            />
            <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
        </div>
      </div>
      <button 
        onClick={nextStep} 
        disabled={!formData.name || !formData.email || !formData.password || formData.password.length < 6} 
        className="w-full bg-[#005CA9] text-white p-3 rounded-lg font-medium mt-4 disabled:opacity-50 transition-colors"
      >
        Continuar
      </button>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800">Documentação</h2>
      <p className="text-gray-500 text-sm">Envie fotos claras dos documentos.</p>

      {/* Profile Photo */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition">
        <input type="file" id="photo" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'photo')} />
        <label htmlFor="photo" className="cursor-pointer flex flex-col items-center">
            {uploads.photo ? (
                <img src={uploads.photo} className="w-20 h-20 rounded-full object-cover mb-2" alt="Profile Preview" />
            ) : (
                <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <Camera className="text-[#005CA9]" />
                </div>
            )}
            <span className="font-medium text-gray-700">Foto de Perfil</span>
            <span className="text-xs text-gray-400">Selfie recente (fundo branco)</span>
        </label>
      </div>

      {/* Comprovante */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg"><Upload size={20} /></div>
            <div>
                <p className="text-sm font-medium">Comprovante de Matrícula</p>
                <p className="text-xs text-gray-400">{uploads.proof ? 'Arquivo selecionado' : 'PDF ou JPG'}</p>
            </div>
         </div>
         <input type="file" id="proof" className="hidden" onChange={(e) => handleFileUpload(e, 'proof')} />
         <label htmlFor="proof" className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-bold text-gray-600 cursor-pointer">
            {uploads.proof ? 'Alterar' : 'Escolher'}
         </label>
      </div>

      <button onClick={nextStep} disabled={!uploads.photo} className="w-full bg-[#005CA9] text-white p-3 rounded-lg font-medium disabled:opacity-50">
        {isLoading ? <Loader2 className="animate-spin mx-auto"/> : 'Enviar Documentos'}
      </button>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Pagamento da Taxa</h2>
        <p className="text-gray-500 text-sm mt-1">Taxa anual de emissão</p>
       </div>

       <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
            <h3 className="text-3xl font-bold text-[#005CA9]">R$ 15,00</h3>
            <p className="text-sm text-blue-600">Validade até Dez/2025</p>
       </div>

       <div className="space-y-3">
            <button onClick={nextStep} className="w-full flex items-center justify-center gap-2 border border-gray-200 p-4 rounded-xl hover:bg-gray-50 transition">
                <span className="font-bold text-gray-700">PIX</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Aprovação Imediata</span>
            </button>
            <button onClick={nextStep} className="w-full flex items-center justify-center gap-2 border border-gray-200 p-4 rounded-xl hover:bg-gray-50 transition">
                 <CreditCard size={18} className="text-gray-500"/>
                <span className="font-bold text-gray-700">Cartão de Crédito</span>
            </button>
       </div>
       
       <p className="text-xs text-center text-gray-400">Ambiente Seguro (Simulado)</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600 text-sm">Cancelar</button>
                <div className="flex gap-2">
                    {[1,2,3].map(i => (
                        <div key={i} className={`h-2 w-2 rounded-full ${step >= i-1 ? 'bg-[#005CA9]' : 'bg-gray-300'}`} />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                {step === Step.PERSONAL_INFO && renderPersonalInfo()}
                {step === Step.DOCUMENTS && renderDocuments()}
                {step === Step.PAYMENT && renderPayment()}
                {step === Step.SUCCESS && (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tudo Pronto!</h2>
                        <p className="text-gray-500 mb-8">Sua carteira digital foi gerada com sucesso e já está disponível.</p>
                        <button onClick={handleFinish} className="w-full bg-[#005CA9] text-white p-3 rounded-lg font-bold shadow-lg">
                            Acessar Carteira
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default Onboarding;