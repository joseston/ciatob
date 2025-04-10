// src/app/servicios/components/ServiceCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types/service.types';
import { Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onSelect: (id: number) => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, index }) => {
  const { id, nombre, descripcion, costo, duracion, icono: Icono, destacado } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full 
                ${destacado ? 'border-2 border-[#46b1b9]' : 'border border-gray-200'}`}
      onClick={() => onSelect(id)}
    >
      {destacado && (
        <div className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white text-xs font-bold uppercase py-1 px-2 text-center">
          Servicio Destacado
        </div>
      )}
      
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#46b1b9]/20 to-[#22616a]/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
            {Icono && <Icono className="w-6 h-6 text-[#46b1b9]" />}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{nombre}</h3>
        </div>
        
        <div className="flex-grow">
          <p className="text-gray-600 text-sm mb-4">{descripcion}</p>
        </div>
        
        <div className="pt-4 mt-auto border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
              S/ {costo.toFixed(2)}
            </span>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duracion}</span>
            </div>
          </div>
          
          <button 
            className="w-full mt-4 bg-gradient-to-r from-[#46b1b9] to-[#22616a] hover:opacity-90 text-white rounded-lg py-2 px-4 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            Ver detalles
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;