// src/app/especialidades/components/SpecialistGrid.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Specialist } from '../types/specialist.types';
import SpecialistCard from './SpecialistCard';

interface SpecialistGridProps {
  specialists: Specialist[];
  loading: boolean;
}

const SpecialistGrid: React.FC<SpecialistGridProps> = ({ specialists, loading }) => {
  // Animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Spinner para estado de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#46b1b9]"></div>
      </div>
    );
  }

  // Mensaje si no hay especialistas
  if (specialists.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-lg text-gray-600">
          No se encontraron especialistas en esta categoría.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="specialist-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {specialists.map((specialist) => (
          <motion.div
            key={specialist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SpecialistCard specialist={specialist} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SpecialistGrid;