'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCategoriesProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="py-6 overflow-x-auto">
      <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center md:justify-start">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;