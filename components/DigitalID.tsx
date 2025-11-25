import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Student } from '../types';
import { ShieldCheck, Building2 } from 'lucide-react';

interface DigitalIDProps {
  student: Student;
}

const DigitalID: React.FC<DigitalIDProps> = ({ student }) => {
  // Data to encode in QR. In a real app, this is a signed JWT or a specialized verify URL.
  const qrData = JSON.stringify({
    id: student.enrollmentId,
    uid: student.uid,
    valid: student.validUntil,
    type: 'UFPI_STUDENT'
  });

  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000 group">
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 aspect-[1/1.6] flex flex-col">
        
        {/* Header - UFPI Blue */}
        <div className="bg-[#005CA9] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
             <Building2 size={80} />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
               <ShieldCheck size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider">UFPI</h1>
              <p className="text-xs font-light text-blue-100">Carteira de Identificação Estudantil</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col items-center bg-white" style={{backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          
          {/* Photo */}
          <div className="relative -mt-12 mb-4">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
              <img 
                src={student.photoUrl} 
                alt={student.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm" title="Active">
              <span className="sr-only">Active</span>
            </div>
          </div>

          {/* Student Info */}
          <div className="text-center w-full space-y-1 mb-6">
            <h2 className="text-xl font-bold text-gray-800 leading-tight uppercase">{student.fullName}</h2>
            <p className="text-sm font-medium text-[#005CA9]">{student.course}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full text-left bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">Matrícula</p>
              <p className="font-mono font-bold text-gray-700">{student.enrollmentId}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">Validade</p>
              <p className="font-mono font-bold text-gray-700">
                {new Date(student.validUntil).toLocaleDateString('pt-BR')}
              </p>
            </div>
             <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">Nível</p>
              <p className="font-bold text-gray-700">Graduação</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">Campus</p>
              <p className="font-bold text-gray-700">Ininga</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="mt-auto bg-white p-2 rounded-lg shadow-sm border border-gray-200">
             <QRCodeSVG value={qrData} size={80} level="M" fgColor="#000000" />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Documento Digital Lei nº 12.933/2013</p>
        </div>

        {/* Footer Stripe */}
        <div className="h-3 w-full bg-yellow-400"></div>
      </div>
    </div>
  );
};

export default DigitalID;