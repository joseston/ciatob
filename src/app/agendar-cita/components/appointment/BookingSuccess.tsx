// src/app/agendar-cita/components/appointment/BookingSuccess.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface BookingSuccessProps {
  appointmentData: {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    doctor: {
      nombre: string;
      specialty?: string;
    };
    patient_status?: string;
  };
  onReset: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ appointmentData, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-xl p-6 text-center max-w-md mx-auto"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
        <p className="text-gray-600">Te contactaremos pronto por WhatsApp</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Detalles de tu solicitud:</h3>
        
        <div className="space-y-2 text-left">
          <div className="flex items-center">
            <User className="w-5 h-5 text-[#46b1b9] mr-2 flex-shrink-0" />
            <p className="text-gray-700 font-medium">
              Dr. {appointmentData.doctor.nombre}
              {appointmentData.doctor.specialty && (
                <span className="text-[#46b1b9] ml-1 font-normal">
                  ({appointmentData.doctor.specialty})
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-[#46b1b9] mr-2 flex-shrink-0" />
            <p className="text-gray-700 capitalize">
              {format(parseISO(appointmentData.fecha), 'EEEE dd MMMM yyyy', { locale: es })}
            </p>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-[#46b1b9] mr-2 flex-shrink-0" />
            <p className="text-gray-700">
              {appointmentData.hora_inicio} - {appointmentData.hora_fin}
            </p>
          </div>
          
          {appointmentData.patient_status && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-[#46b1b9] mr-2 flex-shrink-0" />
              <p className="text-gray-700">
                {appointmentData.patient_status === 'NEW' 
                  ? 'Primera consulta' 
                  : 'Consulta de seguimiento'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Nueva sección de pasos siguientes */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-green-800 mb-2 flex items-center">
          <Phone className="w-4 h-4 mr-2" />
          Próximos Pasos:
        </h4>
        <ol className="text-sm text-green-700 list-decimal list-inside space-y-1">
          <li>Te contactaremos por <strong>WhatsApp</strong> en las próximas horas</li>
          <li>Confirmaremos la disponibilidad del horario solicitado</li>
          <li>Coordinaremos el <strong>pago de la consulta</strong></li>
          <li>Te enviaremos los detalles finales de tu cita</li>
        </ol>
        <p className="text-xs text-green-600 mt-2 font-medium">
          📱 Mantén tu WhatsApp activo para recibir nuestra confirmación
        </p>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <p><strong>ID de Solicitud:</strong> #{appointmentData.id}</p>
        <p className="mt-1">💚 Guarda este número por si necesitas consultarnos</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg border border-[#46b1b9] text-[#46b1b9] font-medium hover:bg-[#46b1b9]/10 transition-all"
          >
            Volver al inicio
          </motion.button>
        </Link>
        
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-medium hover:shadow-md transition-all"
        >
          Solicitar otra cita
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookingSuccess;