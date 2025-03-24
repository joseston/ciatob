'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceHeaderProps {
  title?: string;
  description?: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title = "Nuestros Servicios",
  description = "Ofrecemos una amplia gama de servicios especializados para el tratamiento integral de la obesidad, combinando diferentes disciplinas médicas y el uso de tecnología avanzada."
}) => {
  return (
    <section className="py-12 bg-gradient-to-b from-[#46b1b9]/10 to-transparent">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {title.split(' ').map((word, index) => (
            <span key={index}>
              {index === 1 ? (
                <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                  {` ${word} `}
                </span>
              ) : (
                ` ${word} `
              )}
            </span>
          ))}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </motion.div>
    </section>
  );
};

export default ServiceHeader;