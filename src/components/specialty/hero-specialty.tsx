// src/components/specialty/hero-specialty.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface HeroSpecialtyProps {
  title: string;
  description: string;
  imagePath: string;
  stats: Stat[];
}

const HeroSpecialty: React.FC<HeroSpecialtyProps> = ({
  title,
  description,
  imagePath,
  stats
}) => {
  // Determine colors based on specialty
  const getSpecialtyColors = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case 'endocrinología':
        return {
          primary: '#02283b',
          secondary: '#1a4a5c',
          gradient: 'from-[#02283b] to-[#1a4a5c]',
          bgGradient: 'from-[#02283b] to-[#1a4a5c]',
          textGradient: 'from-white to-gray-200'
        };
      case 'nutrición':
        return {
          primary: '#d29113',
          secondary: '#b8781a',
          gradient: 'from-[#d29113] to-[#b8781a]',
          bgGradient: 'from-[#d29113] to-[#b8781a]',
          textGradient: 'from-white to-yellow-100'
        };
      case 'psicología':
        return {
          primary: '#b72955',
          secondary: '#a02348',
          gradient: 'from-[#b72955] to-[#a02348]',
          bgGradient: 'from-[#b72955] to-[#a02348]',
          textGradient: 'from-white to-pink-100'
        };
      case 'medicina deportiva':
        return {
          primary: '#398e43',
          secondary: '#2d7235',
          gradient: 'from-[#398e43] to-[#2d7235]',
          bgGradient: 'from-[#398e43] to-[#2d7235]',
          textGradient: 'from-white to-green-100'
        };
      default:
        return {
          primary: '#46b1b9',
          secondary: '#22616a',
          gradient: 'from-[#46b1b9] to-[#22616a]',
          bgGradient: 'from-[#46b1b9] to-[#22616a]',
          textGradient: 'from-white to-gray-200'
        };
    }
  };

  const colors = getSpecialtyColors(title);

  return (
    <section className={`relative py-20 bg-gradient-to-br ${colors.bgGradient} overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Especialidad en{' '}
              <span className={`bg-gradient-to-r ${colors.textGradient} text-transparent bg-clip-text`}>
                {title}
              </span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              {description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <div className="flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-white mb-2" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-sm text-gray-200">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center px-8 py-4 rounded-lg bg-white text-[${colors.primary}] font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300`}
            >
              Agendar Consulta
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src={imagePath}
                alt={`${title} en CIATOB`}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-t from-[${colors.primary}]/20 to-transparent`}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSpecialty;