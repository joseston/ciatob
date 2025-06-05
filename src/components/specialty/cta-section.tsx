// src/components/specialty/cta-section.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  specialty?: string;
}

const CTASection: React.FC<CTASectionProps> = ({ specialty }) => {
  // Determine color based on specialty prop
  const getSpecialtyColors = (specialtyName?: string) => {
    if (!specialtyName) {
      // Fallback to pathname detection
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        if (path.includes('nutricion')) {
          specialtyName = 'nutrición';
        } else if (path.includes('endocrinologia')) {
          specialtyName = 'endocrinología';
        } else if (path.includes('psicologia')) {
          specialtyName = 'psicología';
        } else if (path.includes('medicina-deportiva')) {
          specialtyName = 'medicina deportiva';
        }
      }
    }

    switch (specialtyName?.toLowerCase()) {
      case 'nutrición':
        return {
          gradient: 'from-[#d29113] to-[#b8781a]',
          primary: '#d29113'
        };
      case 'endocrinología':
        return {
          gradient: 'from-[#02283b] to-[#1a4a5c]',
          primary: '#02283b'
        };
      case 'psicología':
        return {
          gradient: 'from-[#b72955] to-[#a02348]',
          primary: '#b72955'
        };
      case 'medicina deportiva':
        return {
          gradient: 'from-[#398e43] to-[#2d7235]',
          primary: '#398e43'
        };
      default:
        return {
          gradient: 'from-[#46b1b9] to-[#22616a]',
          primary: '#46b1b9'
        };
    }
  };

  const colors = getSpecialtyColors(specialty);

  return (
    <section className={`py-20 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
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
              Comienza Tu Transformación Hoy
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Da el primer paso hacia una vida más saludable. Nuestro equipo de especialistas 
              está listo para acompañarte en tu journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ color: colors.primary }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Conocer Más
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;