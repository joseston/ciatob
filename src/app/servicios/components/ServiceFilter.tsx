import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCategory } from '../types/service.types';

interface ServiceFilterProps {
  selectedCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
}

const categories: { id: ServiceCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'consulta', label: 'Consultas' },
  { id: 'terapia', label: 'Terapias' },
  { id: 'chequeo', label: 'Chequeos' },
  { id: 'plan', label: 'Planes' }
];

const ServiceFilter: React.FC<ServiceFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceFilter;
