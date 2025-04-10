// src/app/servicios/components/ServiceList.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types/service.types';
import ServiceCard from './ServiceCard';
import ServiceFilter from './ServiceFilter';
import { ServiceCategory } from '../types/service.types';

interface ServiceListProps {
  services: Service[];
  selectedCategory: ServiceCategory;
  loading: boolean;
  error: string | null;
  onCategoryChange: (category: ServiceCategory) => void;
  onSelectService: (id: number) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ 
  services, 
  selectedCategory,
  loading, 
  error,
  onCategoryChange,
  onSelectService
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#46b1b9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ServiceFilter selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
      
      {services.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay servicios disponibles en esta categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelect={onSelectService}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ServiceList;