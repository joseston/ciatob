// src/components/appointment/TimeSlotSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Slot, GroupedSlots } from '../../types/appointment';

interface TimeSlotSelectorProps {
  groupedSlots: GroupedSlots;
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
  loading: boolean;
  doctorSelected: boolean;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  groupedSlots,
  selectedSlot,
  onSelectSlot,
  loading,
  doctorSelected
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Horarios Disponibles
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#46b1b9]"></div>
        </div>
      ) : !doctorSelected ? (
        <div className="text-center py-10 text-gray-500">
          <p>Selecciona un especialista para ver los horarios disponibles</p>
        </div>
      ) : Object.keys(groupedSlots).length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No hay horarios disponibles en el rango de fechas seleccionado</p>
          <p className="text-sm mt-2">Intenta con un rango de fechas diferente</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSlots).map(([date, daySlots]) => (
            <div key={date} className="border-b border-gray-200 pb-6 last:border-0">
              <h3 className="font-medium text-gray-900 mb-3 capitalize">
                {format(parseISO(date), 'EEEE dd MMMM yyyy', { locale: es })}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {daySlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    onClick={() => onSelectSlot(slot)}
                    className={`p-3 rounded-lg text-center transition-all duration-200 ${
                      selectedSlot?.id === slot.id
                        ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white shadow-md'
                        : 'bg-gray-50 hover:bg-[#46b1b9]/10 text-gray-900'
                    }`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <p className="font-medium">{slot.hora_inicio}</p>
                    <p className="text-xs opacity-80">{slot.duracion} min</p>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TimeSlotSelector;