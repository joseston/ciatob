// src/components/appointment/DoctorSelector.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronDown, User, Award, IdCard } from 'lucide-react';
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
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null);

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

  const handleDoctorClick = (doctor: Doctor) => {
    if (selectedDoctor?.id === doctor.id) {
      // Si ya está seleccionado, expandir/contraer detalles
      setExpandedDoctor(expandedDoctor === doctor.id ? null : doctor.id);
    } else {
      // Seleccionar nuevo doctor
      onSelectDoctor(doctor.id);
      setExpandedDoctor(doctor.id);
    }
  };

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
      ) : (
        <div className="space-y-3">
          {doctors.map((doctor) => {
            const isSelected = selectedDoctor?.id === doctor.id;
            const isExpanded = expandedDoctor === doctor.id;

            return (
              <motion.div
                key={doctor.id}
                layout
                className={`rounded-lg border transition-all duration-300 ${
                  isSelected
                    ? 'border-[#46b1b9] bg-gradient-to-r from-[#46b1b9]/5 to-[#22616a]/5'
                    : 'border-gray-200 hover:border-[#46b1b9]/30 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <motion.button
                  onClick={() => handleDoctorClick(doctor)}
                  className="w-full p-4 text-left"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {/* Avatar del doctor */}
                      <div className="flex-shrink-0">
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

                      {/* Información básica */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{doctor.nombre}</div>
                        {doctor.specialty && (
                          <div className="text-sm text-[#46b1b9] truncate">{doctor.specialty.name}</div>
                        )}
                      </div>
                    </div>

                    {/* Indicador de expansión */}
                    <div className="flex items-center space-x-2">
                      {isSelected && (
                        <div className="w-2 h-2 bg-[#46b1b9] rounded-full"></div>
                      )}
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </motion.button>

                {/* Detalles expandibles */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-200 bg-white rounded-b-lg overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        {/* Información adicional del doctor */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          {doctor.profession && (
                            <div className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-[#46b1b9]" />
                              <span className="text-gray-600">Profesión:</span>
                              <span className="font-medium text-gray-900">{doctor.profession}</span>
                            </div>
                          )}
                          
                          {doctor.cmp_id && (
                            <div className="flex items-center space-x-2">
                              <IdCard className="w-4 h-4 text-[#46b1b9]" />
                              <span className="text-gray-600">CMP:</span>
                              <span className="font-medium text-gray-900">{doctor.cmp_id}</span>
                            </div>
                          )}
                          
                          {doctor.gender && (
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-[#46b1b9]" />
                              <span className="text-gray-600">Género:</span>
                              <span className="font-medium text-gray-900 capitalize">
                                {doctor.gender === 'male' ? 'Masculino' : 'Femenino'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Nota sobre disponibilidad */}
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-xs text-gray-500 text-center">
                            Selecciona una fecha en el calendario para ver los horarios disponibles
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default DoctorSelector;