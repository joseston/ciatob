// src/components/appointment/AppointmentSummary.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';
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
  dateRange,
  selectedSlot
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <CalendarIcon className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Resumen de tu Selección
      </h2>

      {selectedDoctor ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Especialista</h3>
            <p className="text-[#46b1b9]">{selectedDoctor.nombre}</p>
            {selectedDoctor.specialty && (
              <p className="text-sm text-gray-600">{selectedDoctor.specialty.name}</p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Rango de fechas</h3>
            <p className="text-gray-600">
              {format(dateRange.startDate, 'dd MMM yyyy', { locale: es })} - {format(dateRange.endDate, 'dd MMM yyyy', { locale: es })}
            </p>
          </div>

          {selectedSlot && (
            <div className="p-4 bg-[#46b1b9]/10 border border-[#46b1b9]/30 rounded-lg">
              <h3 className="font-medium text-gray-900">Horario seleccionado</h3>
              <p className="text-[#22616a] font-medium">
                {format(parseISO(selectedSlot.fecha), 'EEEE dd MMM yyyy', { locale: es })}
              </p>
              <p className="text-[#22616a]">
                {selectedSlot.hora_inicio} - {selectedSlot.hora_fin}
              </p>
              <p className="text-sm text-gray-600">
                Duración: {selectedSlot.duracion} minutos
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
          <CalendarIcon className="w-12 h-12 mb-2 text-gray-300" />
          <p>Selecciona un especialista para ver la disponibilidad</p>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentSummary;