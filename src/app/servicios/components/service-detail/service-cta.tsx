'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

interface ServiceCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = "Comienza Tu Transformación Hoy",
  description = "Da el primer paso hacia una vida más saludable. Nuestro equipo de especialistas está listo para acompañarte en tu journey.",
  primaryButtonText = "Agendar Consulta",
  secondaryButtonText = "Contáctanos",
  onPrimaryAction,
  onSecondaryAction
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#46b1b9] to-[#22616a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrimaryAction}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[#46b1b9] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {primaryButtonText}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSecondaryAction}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
              >
                {secondaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;