// src/app/empresas/components/PaqueteCard.tsx
// src/app/empresas/components/PaqueteCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Users, Clock, ArrowRight } from 'lucide-react';
import { PaqueteEmpresarial } from '../types/empresa.types';

interface PaqueteCardProps {
  paquete: PaqueteEmpresarial;
  onSelect?: (paqueteId: string) => void;
}

const PaqueteCard: React.FC<PaqueteCardProps> = ({ paquete, onSelect }) => {
  const getCardStyle = () => {
    switch (paquete.tipo) {
      case 'basico':
        return {
          gradient: 'from-blue-500 to-blue-600',
          bgGradient: 'from-blue-50 to-blue-100',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-600'
        };
      case 'integral':
        return {
          gradient: 'from-[#02283b] to-[#1a4a5c]',
          bgGradient: 'from-[#02283b]/5 to-[#1a4a5c]/10',
          borderColor: 'border-[#02283b]/20',
          textColor: 'text-[#02283b]'
        };
      case 'premium':
        return {
          gradient: 'from-purple-500 to-purple-600',
          bgGradient: 'from-purple-50 to-purple-100',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-600'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-600'
        };
    }
  };

  const cardStyle = getCardStyle();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(paquete.id);
    } else {
      // Scroll to contact form
      const elemento = document.getElementById('contacto-empresarial');
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative h-full ${paquete.destacado ? 'transform scale-105' : ''}`}
    >
      {/* Destacado Badge */}
      {paquete.destacado && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`bg-gradient-to-r ${cardStyle.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg`}>
            <Star className="w-4 h-4 mr-1" />
            Más Popular
          </div>
        </div>
      )}

      <div className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden ${
        paquete.destacado ? 'border-2 border-[#02283b]/20' : 'border border-gray-100'
      }`}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${cardStyle.bgGradient} p-8 text-center`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{paquete.nombre}</h3>
          <p className="text-gray-600 mb-4">{paquete.descripcion}</p>
          
          {/* Price */}
          <div className={`text-3xl font-bold ${cardStyle.textColor} mb-2`}>
            {paquete.precio}
          </div>
          
          {/* Duration and Participants */}
          <div className="space-y-2">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {paquete.duracion}
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              {paquete.participantes}
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="p-8 flex-grow">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">Incluye:</h4>
          <div className="space-y-4">
            {paquete.servicios.map((servicio, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className={`w-5 h-5 ${cardStyle.textColor} mt-0.5 flex-shrink-0`} />
                <span className="text-gray-700 text-sm leading-relaxed">{servicio}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-8 pt-0">
          <motion.button
            onClick={handleSelect}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${cardStyle.gradient} hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
          >
            Solicitar información
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className={`w-full h-full bg-gradient-to-br ${cardStyle.gradient} rounded-full transform translate-x-16 -translate-y-16`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaqueteCard;