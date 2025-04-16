import React from 'react';
import { motion } from 'framer-motion';
import { BlogCategory } from '../types/blog.types';

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategoryId?: number;
  onCategoryChange: (categoryId: number | undefined) => void;
  loading: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  loading
}) => {
  if (loading) {
    return (
      <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse mr-2"></div>
        <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse mr-2"></div>
        <div className="w-28 h-10 bg-gray-200 rounded-full animate-pulse mr-2"></div>
      </div>
    );
  }
  
  return (
    <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(undefined)}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 
          ${!selectedCategoryId 
            ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        Todos
      </motion.button>
      
      {categories.map(category => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2
            ${selectedCategoryId === category.id
              ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;