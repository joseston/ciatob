// src/app/servicios/page.tsx
'use client';

import React, { useState } from 'react';
import { useServices } from './hooks/useServices';
import { 
  ServiceList, 
  ServiceDetailModal 
} from './components';
import { ServiceCategory } from './types/service.types';

export default function ServiciosPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  const { 
    filteredServices, 
    selectedCategory,
    loading, 
    error, 
    filterServicesByCategory,
    getServiceById 
  } = useServices();

  const handleCategoryChange = (category: ServiceCategory) => {
    filterServicesByCategory(category);
  };

  const handleSelectService = (id: number) => {
    setSelectedServiceId(id);
  };

  const handleCloseModal = () => {
    setSelectedServiceId(null);
  };

  return (
    <main className="min-h-screen">

      
      {/* Services Section */}
      <section id="servicios" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Conoce Nuestros Servicios</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Ofrecemos una amplia gama de servicios especializados para ayudarte a alcanzar tus objetivos de salud de manera integral.
          </p>
          
          <ServiceList 
            services={filteredServices} 
            selectedCategory={selectedCategory}
            loading={loading} 
            error={error}
            onCategoryChange={handleCategoryChange}
            onSelectService={handleSelectService}
          />
        </div>
      </section>
      
      {/* Modal para detalles del servicio */}
      <ServiceDetailModal 
        serviceId={selectedServiceId} 
        onClose={handleCloseModal}
        getServiceById={getServiceById}
      />
    </main>
  );
}