import React from 'react';
import { motion } from 'framer-motion';
import { ActivitySquare } from 'lucide-react';
import { Specialty } from '../../types/appointment';

interface HorizontalSpecialtySelectorProps {
  specialties: Specialty[];
  selectedSpecialty: Specialty | null;
  onSelectSpecialty: (specialtyId: number) => void;
}

const HorizontalSpecialtySelector: React.FC<HorizontalSpecialtySelectorProps> = ({
  specialties,
  selectedSpecialty,
  onSelectSpecialty
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg w-full mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <ActivitySquare className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Selecciona una Especialidad
      </h2>
      <div className="flex flex-wrap gap-3">
        {specialties.map((specialty) => (
          <motion.button
            key={specialty.id}
            onClick={() => onSelectSpecialty(specialty.id)}
            className={`p-3 rounded-lg text-center transition-all duration-300 flex-grow min-w-[150px] ${
              selectedSpecialty?.id === specialty.id
                ? 'bg-gradient-to-r from-[#46b1b9]/20 to-[#22616a]/20 border-b-4 border-[#46b1b9]'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-gray-900">{specialty.name}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HorizontalSpecialtySelector;
