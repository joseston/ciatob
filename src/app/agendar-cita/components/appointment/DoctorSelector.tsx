// src/components/appointment/DoctorSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Image from 'next/image';
import { Doctor } from '../../types/appointment';

interface DoctorSelectorProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctorId: number) => void;
  disabled?: boolean;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
  doctors,
  selectedDoctor,
  onSelectDoctor,
  disabled = false
}) => {
  console.log('👨‍⚕️ DoctorSelector - Renderizando con:', {
    disabled,
    totalDoctors: doctors.length,
    doctors: doctors.map(d => ({
      id: d.id,
      nombre: d.nombre,
      specialtyId: d.specialty?.id,
      specialtyName: d.specialty?.name
    })),
    selectedDoctor: selectedDoctor ? {
      id: selectedDoctor.id,
      nombre: selectedDoctor.nombre,
      specialtyName: selectedDoctor.specialty?.name
    } : null
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Selecciona un Especialista
      </h2>
      
      {disabled ? (
        <div className="text-center py-6 text-gray-500">
          <p>Primero selecciona una especialidad</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>No hay especialistas disponibles para esta especialidad</p>
        </div>
      ) : (        <div className="space-y-3">
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
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{doctor.nombre}</div>
                  {doctor.specialty && (
                    <div className="text-sm text-[#46b1b9]">{doctor.specialty.name}</div>
                  )}
                </div>
                <div className="ml-3 flex-shrink-0">
                  {doctor.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#46b1b9]/20 bg-gray-100">
                      <Image
                        src={doctor.image}
                        alt={`Dr. ${doctor.nombre}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#46b1b9] to-[#22616a] flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {doctor.nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DoctorSelector;