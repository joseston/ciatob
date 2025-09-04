// src/components/appointment/AppointmentSummary.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, CheckCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Doctor, Slot, DateRange } from '../../types/appointment';

interface AppointmentSummaryProps {
  selectedDoctor: Doctor | null;
  dateRange: DateRange;
  selectedSlot: Slot | null;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({
  selectedDoctor,
  /* dateRange, */
  selectedSlot
}) => {
  if (!selectedDoctor || !selectedSlot) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-green-50 to-[#46b1b9]/5 border border-green-200 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center space-x-2 mb-4">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Cita Confirmada
        </h2>
      </div>

      <div className="space-y-4">
        {/* Doctor */}
        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-[#46b1b9] mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">Especialista</p>
            <p className="font-semibold text-gray-900">{selectedDoctor.nombre}</p>
            {selectedDoctor.specialty && (
              <p className="text-sm text-[#46b1b9]">{selectedDoctor.specialty.name}</p>
            )}
          </div>
        </div>

        {/* Fecha y hora */}
        <div className="flex items-start space-x-3">
          <CalendarIcon className="w-5 h-5 text-[#46b1b9] mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">Fecha y hora</p>
            <p className="font-semibold text-gray-900 capitalize">
              {format(parseISO(selectedSlot.fecha), 'EEEE, dd \'de\' MMMM \'de\' yyyy', { locale: es })}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-[#22616a] font-medium">
                {selectedSlot.hora_inicio} - {selectedSlot.hora_fin}
              </span>
              <span className="text-xs text-gray-500">
                ({selectedSlot.duracion} min)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nota */}
      <div className="mt-4 p-3 bg-white/60 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Revisa los detalles y presiona &quot;Confirmar Cita&quot; para continuar
        </p>
      </div>
    </motion.div>
  );
};

export default AppointmentSummary;