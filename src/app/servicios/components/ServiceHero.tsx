import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

const ServiceHero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#46b1b9]/10 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-3 bg-[#46b1b9]/20 rounded-full mb-6"
          >
            <HeartPulse className="w-8 h-8 text-[#46b1b9]" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Nuestros 
            <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text ml-2">
              Servicios
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            En CIATOB ofrecemos una amplia gama de servicios médicos especializados para el tratamiento integral de la obesidad
            y el mejoramiento de la salud metabólica.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#servicios" className="btn bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300">
              Ver servicios
            </a>
            <a href="#contacto" className="btn bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-[#46b1b9] hover:shadow-lg transition-all duration-300">
              Consultar disponibilidad
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
