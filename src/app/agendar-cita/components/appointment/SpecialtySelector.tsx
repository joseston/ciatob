import React from 'react';
import { motion } from 'framer-motion';
import { ActivitySquare } from 'lucide-react';
import { Specialty } from '../../types/appointment';

interface SpecialtySelectorProps {
  specialties: Specialty[];
  selectedSpecialty: Specialty | null;
  onSelectSpecialty: (specialtyId: number) => void;
}

const SpecialtySelector: React.FC<SpecialtySelectorProps> = ({
  specialties,
  selectedSpecialty,
  onSelectSpecialty
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <ActivitySquare className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Selecciona una Especialidad
      </h2>
      <div className="space-y-3">
        {specialties.map((specialty) => (
          <motion.button
            key={specialty.id}
            onClick={() => onSelectSpecialty(specialty.id)}
            className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
              selectedSpecialty?.id === specialty.id
                ? 'bg-gradient-to-r from-[#46b1b9]/20 to-[#22616a]/20 border-l-4 border-[#46b1b9]'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-gray-900">{specialty.name}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SpecialtySelector;