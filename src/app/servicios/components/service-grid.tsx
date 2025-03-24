'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard, { ServiceCardProps } from './service-card';
import { motion } from 'framer-motion';

interface ServiceGridProps {
  services: ServiceCardProps[];
  selectedCategory: string;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, selectedCategory }) => {
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  return (
    <div className="w-full py-8">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </motion.div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron servicios para esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;