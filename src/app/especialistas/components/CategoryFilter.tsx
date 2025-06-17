// src/app/especialidades/components/CategoryFilter.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SpecialtyCategory } from '../types/specialist.types';
import { categoryLabels } from '../services/specialists.service';

interface CategoryFilterProps {
  selectedCategory: SpecialtyCategory;
  onSelectCategory: (category: SpecialtyCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  // Todas las categorías disponibles
  const categories: SpecialtyCategory[] = [
    'todos', 
    'endocrinologia', 
    'nutricion', 
    'psicologia', 
    'prescripcion-ejercicio'
  ];

  return (
    <div className="w-full mb-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 md:gap-4"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`relative px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium 
              ${selectedCategory === category 
                ? 'text-white' 
                : 'text-gray-700 hover:text-[#46b1b9]'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Fondo animado para el botón activo */}
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategoryBackground"
                className="absolute inset-0 bg-gradient-to-r from-[#46b1b9] to-[#22616a] rounded-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Texto del botón */}
            <span className={`relative z-10 ${selectedCategory === category ? 'text-white' : ''}`}>
              {categoryLabels[category]}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;