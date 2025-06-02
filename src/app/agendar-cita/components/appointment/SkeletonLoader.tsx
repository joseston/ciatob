// src/components/appointment/SkeletonLoader.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Componente base para efectos de shimmer
const SkeletonShimmer: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <div className={`animate-pulse ${className}`}>
    {children || <div className="bg-gray-200 rounded"></div>}
  </div>
);

// Skeleton para el selector de doctores
export const DoctorSelectorSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <SkeletonShimmer className="w-5 h-5 mr-2 bg-gray-300 rounded" />
        <SkeletonShimmer className="h-6 w-48 bg-gray-300 rounded" />
      </div>
      
      {/* Lista de doctores skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((index) => (
          <SkeletonShimmer key={index} className="w-full">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="bg-gray-200 h-5 w-3/4 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          </SkeletonShimmer>
        ))}
      </div>
    </motion.div>
  );
};

// Skeleton para el selector de fechas
export const DateRangeSelectorSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <SkeletonShimmer className="w-5 h-5 mr-2 bg-gray-300 rounded" />
        <SkeletonShimmer className="h-6 w-56 bg-gray-300 rounded" />
      </div>
      
      <div className="space-y-4">
        {/* Fecha de inicio */}
        <div>
          <SkeletonShimmer className="h-4 w-24 bg-gray-300 rounded mb-1" />
          <SkeletonShimmer className="h-10 w-full bg-gray-200 rounded-md" />
        </div>
        
        {/* Fecha de fin */}
        <div>
          <SkeletonShimmer className="h-4 w-20 bg-gray-300 rounded mb-1" />
          <SkeletonShimmer className="h-10 w-full bg-gray-200 rounded-md" />
        </div>
        
        {/* Botón de búsqueda */}
        <SkeletonShimmer className="h-10 w-full bg-gray-200 rounded-lg mt-4" />
      </div>
    </motion.div>
  );
};

// Skeleton para el selector de especialidades horizontal
export const SpecialtySelectorSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <SkeletonShimmer className="h-7 w-48 bg-gray-300 rounded mb-4 mx-auto" />
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <SkeletonShimmer key={index} className="min-w-[140px]">
            <div className="bg-gray-100 px-4 py-3 rounded-xl border-2 border-transparent">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-gray-200 w-8 h-8 rounded"></div>
              </div>
              <div className="bg-gray-200 h-4 w-full rounded"></div>
            </div>
          </SkeletonShimmer>
        ))}
      </div>
    </motion.div>
  );
};

// Skeleton para el selector de horarios
export const TimeSlotSelectorSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg mb-10"
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <SkeletonShimmer className="w-5 h-5 mr-2 bg-gray-300 rounded" />
        <SkeletonShimmer className="h-6 w-40 bg-gray-300 rounded" />
      </div>
      
      {/* Días de la semana */}
      <div className="space-y-6">
        {[1, 2, 3].map((dayIndex) => (
          <div key={dayIndex}>
            <SkeletonShimmer className="h-5 w-32 bg-gray-300 rounded mb-3" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((slotIndex) => (
                <SkeletonShimmer key={slotIndex} className="h-10 bg-gray-200 rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkeletonShimmer;
