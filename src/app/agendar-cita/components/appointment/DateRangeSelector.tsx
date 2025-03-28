// src/components/appointment/DateRangeSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from '../../types/appointment';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateChange: (type: 'start' | 'end', date: Date) => void;
  disabled: boolean;
  onSearch: () => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onDateChange,
  disabled,
  onSearch
}) => {
  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const date = new Date(value);
    onDateChange(type, date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Selecciona un Rango de Fechas
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de inicio
          </label>
          <input
            type="date"
            id="startDate"
            min={format(new Date(), 'yyyy-MM-dd')}
            value={format(dateRange.startDate, 'yyyy-MM-dd')}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de fin
          </label>
          <input
            type="date"
            id="endDate"
            min={format(dateRange.startDate, 'yyyy-MM-dd')}
            value={format(dateRange.endDate, 'yyyy-MM-dd')}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={disabled}
          onClick={onSearch}
          className={`w-full mt-4 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
            !disabled
              ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Buscar Disponibilidad</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DateRangeSelector;