// src/app/agendar-cita/components/appointment/DayTimeSlots.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock/* , ArrowLeft */ } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TimeSlot, Doctor } from '../../types/appointment';

interface DayTimeSlotsProps {
  selectedDate: Date | null;
  timeSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  onBack: () => void;
  doctor: Doctor | null;
  loading: boolean;
  onContinue?: () => void; // Nueva prop para el botón continuar
}

const DayTimeSlots: React.FC<DayTimeSlotsProps> = ({
  selectedDate,
  timeSlots,
  selectedSlot,
  onSelectSlot,
/*   onBack, */
  doctor,
  loading,
  onContinue
}) => {
  if (!selectedDate) return null;

  const formattedDate = format(selectedDate, "EEEE, d 'de' MMMM", { locale: es });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Header sin botón de regreso */}
      <div className="mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-[#46b1b9]" />
            Horarios Disponibles
          </h3>
          <p className="text-sm text-gray-600 capitalize mt-1">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Doctor info */}
      {doctor && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#46b1b9]/5 to-[#22616a]/5 rounded-lg border-l-4 border-[#46b1b9]">
          <p className="text-sm text-gray-600">Consulta con</p>
          <p className="font-semibold text-gray-900">{doctor.nombre}</p>
          {doctor.specialty && (
            <p className="text-sm text-[#46b1b9]">{doctor.specialty.name}</p>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#46b1b9]"></div>
          <span className="ml-3 text-gray-600">Cargando horarios...</span>
        </div>
      )}

      {/* Time slots */}
      {!loading && (
        <AnimatePresence>
          {timeSlots.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No hay horarios disponibles</p>
              <p className="text-sm">Para este día. Intenta con otra fecha.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timeSlots.map((slot, index) => (
                <motion.button
                  key={`${slot.fecha}-${slot.hora_inicio}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectSlot(slot)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${selectedSlot && 
                      selectedSlot.fecha === slot.fecha && 
                      selectedSlot.hora_inicio === slot.hora_inicio
                      ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-[#46b1b9]/10 text-gray-900 hover:shadow-md'
                    }
                    border-2 border-transparent hover:border-[#46b1b9]/20
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-sm">
                      {format(new Date(`2000-01-01T${slot.hora_inicio}`), 'HH:mm')} - {format(new Date(`2000-01-01T${slot.hora_fin}`), 'HH:mm')}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Selected slot confirmation */}
      {selectedSlot && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">
                Horario seleccionado
              </p>
              <p className="text-green-800 font-semibold">
                {format(new Date(`2000-01-01T${selectedSlot.hora_inicio}`), 'HH:mm')} - {' '}
                {format(new Date(`2000-01-01T${selectedSlot.hora_fin}`), 'HH:mm')}
              </p>
            </div>
            <div className="text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}

      {/* Botón de continuar cuando hay un slot seleccionado */}
      {selectedSlot && onContinue && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <button
            onClick={onContinue}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          >
            Continuar con la Reserva
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DayTimeSlots;
