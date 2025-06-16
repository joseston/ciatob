// src/app/servicios/page.tsx
'use client';

import React, { useState } from 'react';
import { useServices } from './hooks/useServices';
import { 
  /* ServiceList,  */
  ServiceDetailModal 
} from './components';
/* import { ServiceCategory } from './types/service.types';
 */import { serviciosPromociones } from './data/servicios-promociones';
import ServiceCard from './components/ServiceCard';

export default function ServiciosPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  const { 
    /* filteredServices, 
    selectedCategory,
    loading, 
    error,  */
    /* filterServicesByCategory, */
    getServiceById 
  } = useServices();

  /* const handleCategoryChange = (category: ServiceCategory) => {
    filterServicesByCategory(category);
  };

  const handleSelectService = (id: number) => {
    setSelectedServiceId(id);
  }; */

  const handleCloseModal = () => {
    setSelectedServiceId(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#02283b] mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestros servicios especializados con promociones exclusivas para tu bienestar integral
          </p>
        </div>

        {/* Services Grid - 3 columns on desktop with wider spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {serviciosPromociones.map((servicio) => (
            <ServiceCard 
              key={servicio.id} 
              service={{
                id: servicio.id,
                slug: servicio.slug,
                titulo: servicio.titulo,
                descripcion: servicio.descripcion,
                precio: servicio.precio,
                precioOriginal: servicio.precioOriginal,
                ubicacion: servicio.ubicacion,
                categoria: servicio.categoria,
                promocion: servicio.promocion
              }} 
            />
          ))}
        </div>
      </div>

      {/* Modal para detalles del servicio */}
      <ServiceDetailModal 
        serviceId={selectedServiceId} 
        onClose={handleCloseModal}
        getServiceById={getServiceById}
      />
    </main>
  );
}