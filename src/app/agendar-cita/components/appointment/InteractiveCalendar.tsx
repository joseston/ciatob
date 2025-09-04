// src/app/agendar-cita/components/appointment/InteractiveCalendar.tsx
'use client';

import React, { useState/* , useEffect  */} from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import { Doctor } from '../../types/appointment';

interface InteractiveCalendarProps {
  selectedDoctor: Doctor | null;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  availableDates: Date[];
  loading: boolean;
}

const InteractiveCalendar: React.FC<InteractiveCalendarProps> = ({
  selectedDoctor,
  onDateSelect,
  selectedDate,
  availableDates,
  loading
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Navegar entre meses
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  // Obtener días del mes actual
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Verificar si una fecha tiene disponibilidad
  const hasAvailability = (date: Date) => {
    return availableDates.some(availableDate => isSameDay(availableDate, date));
  };

  // Verificar si una fecha es seleccionable (no es pasada y el doctor está seleccionado)
  const isDateSelectable = (date: Date) => {
    const isPast = isBefore(date, new Date()) && !isToday(date);
    return !isPast && selectedDoctor && hasAvailability(date);
  };

  // Obtener el primer día de la semana para el layout del calendario
  const firstDayOfMonth = monthStart.getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-[#46b1b9]" />
          Disponibilidad
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="px-4 py-2 bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white rounded-lg font-medium min-w-[140px] text-center">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </div>
          
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Estado sin doctor seleccionado */}
      {!selectedDoctor && (
        <div className="text-center py-12 text-gray-500">
          <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Selecciona un especialista</p>
          <p className="text-sm">Para ver la disponibilidad en el calendario</p>
        </div>
      )}

      {/* Calendario */}
      {selectedDoctor && (
        <>
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {/* Días vacíos al inicio del mes */}
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}

            {/* Días del mes */}
            {days.map((day) => {
              const hasAvail = hasAvailability(day);
              const isSelectable = isDateSelectable(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isPast = isBefore(day, new Date()) && !isToday(day);
              const isTodayDay = isToday(day);

              return (
                <motion.button
                  key={day.getTime()}
                  onClick={() => isSelectable ? onDateSelect(day) : undefined}
                  disabled={!isSelectable || loading}
                  className={`
                    relative p-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isSelected
                      ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white shadow-lg'
                      : isSelectable
                      ? 'hover:bg-[#46b1b9]/10 text-gray-900 cursor-pointer'
                      : isPast
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 cursor-not-allowed'
                    }
                    ${isTodayDay && !isSelected ? 'ring-2 ring-[#46b1b9]/30' : ''}
                  `}
                  whileHover={isSelectable ? { scale: 1.05 } : {}}
                  whileTap={isSelectable ? { scale: 0.95 } : {}}
                >
                  <span>{day.getDate()}</span>
                  
                  {/* Indicador de disponibilidad */}
                  {hasAvail && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#46b1b9] rounded-full"></div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#46b1b9] rounded-full"></div>
              <span>Disponible</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-[#46b1b9] to-[#22616a] rounded-full"></div>
              <span>Seleccionado</span>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#46b1b9]"></div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default InteractiveCalendar;
