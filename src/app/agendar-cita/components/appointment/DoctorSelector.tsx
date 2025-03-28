// src/components/appointment/DoctorSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Doctor } from '../../types/appointment';

interface DoctorSelectorProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctorId: number) => void;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
  doctors,
  selectedDoctor,
  onSelectDoctor
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Selecciona un Especialista
      </h2>
      <div className="space-y-3">
        {doctors.map((doctor) => (
          <motion.button
            key={doctor.id}
            onClick={() => onSelectDoctor(doctor.id)}
            className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
              selectedDoctor?.id === doctor.id
                ? 'bg-gradient-to-r from-[#46b1b9]/20 to-[#22616a]/20 border-l-4 border-[#46b1b9]'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-gray-900">{doctor.nombre}</div>
            {doctor.specialty && (
              <div className="text-sm text-[#46b1b9]">{doctor.specialty.name}</div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DoctorSelector;