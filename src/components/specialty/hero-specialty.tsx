// src/components/specialty/hero-specialty.tsx
'use client';

import React, { useState, useEffect } from 'react';
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

interface SpecialtyColors {
  primary: string;
  secondary: string;
  gradient: string;
  bgGradient: string;
  textGradient: string;
  iconColor: string;
  bgClass: string;
  textClass: string;
}

const HeroSpecialty: React.FC<HeroSpecialtyProps> = ({
  title,
  description,
  imagePath,
  stats
}) => {
  const [isHydrated, setIsHydrated] = useState(false);  const [colors, setColors] = useState<SpecialtyColors>({
    primary: '#02283b',
    secondary: '#011a28', 
    gradient: 'from-[#02283b] to-[#011a28]',
    bgGradient: 'from-[#02283b] to-[#011a28]',
    textGradient: 'from-white to-gray-200',
    iconColor: 'text-white',
    bgClass: 'bg-gradient-to-br from-[#02283b] to-[#011a28]',
    textClass: 'bg-gradient-to-r from-white to-gray-200'
  });

  // Determine colors based on specialty
  const getSpecialtyColors = (specialty: string): SpecialtyColors => {
    switch (specialty.toLowerCase()) {
      case 'endocrinología':
        return {
          primary: '#02283b',
          secondary: '#1a4a5c',
          gradient: 'from-[#02283b] to-[#1a4a5c]',
          bgGradient: 'from-[#02283b] to-[#1a4a5c]',
          textGradient: 'from-white to-gray-200',
          iconColor: 'text-white',
          bgClass: 'bg-gradient-to-br from-[#02283b] to-[#1a4a5c]',
          textClass: 'bg-gradient-to-r from-white to-gray-200'
        };
      case 'nutrición':
        return {
          primary: '#d29113',
          secondary: '#b8781a',
          gradient: 'from-[#d29113] to-[#b8781a]',
          bgGradient: 'from-[#d29113] to-[#b8781a]',
          textGradient: 'from-white to-yellow-100',
          iconColor: 'text-white',
          bgClass: 'bg-gradient-to-br from-[#d29113] to-[#b8781a]',
          textClass: 'bg-gradient-to-r from-white to-yellow-100'
        };
      case 'psicología':
        return {
          primary: '#b72955',
          secondary: '#a02348',
          gradient: 'from-[#b72955] to-[#a02348]',
          bgGradient: 'from-[#b72955] to-[#a02348]',
          textGradient: 'from-white to-pink-100',
          iconColor: 'text-white',
          bgClass: 'bg-gradient-to-br from-[#b72955] to-[#a02348]',
          textClass: 'bg-gradient-to-r from-white to-pink-100'
        };
      case 'prescripcion del ejercicio':
        return {
          primary: '#398e43',
          secondary: '#2d7235',
          gradient: 'from-[#398e43] to-[#2d7235]',
          bgGradient: 'from-[#398e43] to-[#2d7235]',
          textGradient: 'from-white to-green-100',
          iconColor: 'text-white',
          bgClass: 'bg-gradient-to-br from-[#398e43] to-[#2d7235]',
          textClass: 'bg-gradient-to-r from-white to-green-100'
        };
      default:
        return {
          primary: '#46b1b9',
          secondary: '#22616a',
          gradient: 'from-[#46b1b9] to-[#22616a]',
          bgGradient: 'from-[#46b1b9] to-[#22616a]',
          textGradient: 'from-white to-gray-200',
          iconColor: 'text-white',
          bgClass: 'bg-gradient-to-br from-[#46b1b9] to-[#22616a]',
          textClass: 'bg-gradient-to-r from-white to-gray-200'
        };
    }
  };
  // Use useEffect to set colors after hydration
  useEffect(() => {
    console.log('🔍 HERO-SPECIALTY: useEffect ejecutándose');
    console.log('📋 HERO-SPECIALTY: title recibido:', title);
    
    const specialtyColors = getSpecialtyColors(title);
    console.log('🎨 HERO-SPECIALTY: colores calculados:', specialtyColors);
    console.log('🎨 HERO-SPECIALTY: colores previos:', colors);
    
    setColors(specialtyColors);
    setIsHydrated(true);
    
    console.log('✅ HERO-SPECIALTY: Estado actualizado - isHydrated: true');
  }, [title]);
  // Render loading state during hydration
  if (!isHydrated) {
    console.log('⏳ HERO-SPECIALTY: Renderizando estado de carga (no hidratado)');
    console.log('🖼️ HERO-SPECIALTY: imagePath en loading:', imagePath);
    console.log('📝 HERO-SPECIALTY: title en loading:', title);
    console.log('📝 HERO-SPECIALTY: description en loading:', description);
    
    return (
      <section className="relative py-20 bg-gradient-to-br from-[#46b1b9] to-[#22616a] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}/>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Loading State */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Especialidad en{' '}
                <span className="bg-gradient-to-r from-white to-gray-200 text-transparent bg-clip-text">
                  {title}
                </span>
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                {description}
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                  >
                    <div className="flex flex-col items-center">
                      <stat.icon className="w-8 h-8 text-white mb-2" />
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                      <span className="text-sm text-gray-200">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-[#46b1b9] font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300">
                Agendar Consulta
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Image Loading State */}
            <div className="relative">
              <div className="relative">
                <Image
                  src={imagePath}
                  alt={`${title} en CIATOB`}
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }  // Hydrated component with dynamic colors
  console.log('🎯 HERO-SPECIALTY: Renderizando componente hidratado');
  console.log('🎨 HERO-SPECIALTY: colores finales aplicados:', colors);
  console.log('🖼️ HERO-SPECIALTY: imagePath final:', imagePath);
  console.log('📝 HERO-SPECIALTY: title final:', title);
  console.log('🔧 HERO-SPECIALTY: isHydrated:', isHydrated);
  console.log('🖼️ HERO-SPECIALTY: Renderizando Image component con src:', imagePath);
  console.log('🎨 HERO-SPECIALTY: Overlay aplicado con color:', `${colors.primary}20`);
  
  return (
    <section 
      className={`relative py-20 overflow-hidden ${colors.bgClass}`}
      suppressHydrationWarning={true}
    >
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
              <span 
                className={`${colors.textClass} text-transparent bg-clip-text`}
                suppressHydrationWarning={true}
              >
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
                    <stat.icon 
                      className={`w-8 h-8 mb-2 ${colors.iconColor}`}
                      suppressHydrationWarning={true}
                    />
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
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white font-semibold shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
              style={{ color: colors.primary }}
              suppressHydrationWarning={true}
            >
              Agendar Consulta
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
            onAnimationStart={() => console.log('🎬 HERO-SPECIALTY: Animación de imagen iniciando')}
            onAnimationComplete={() => console.log('✅ HERO-SPECIALTY: Animación de imagen completada')}
          >
            <div className="relative">
              <Image
                src={imagePath}
                alt={`${title} en CIATOB`}
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
                onLoad={() => console.log('📸 HERO-SPECIALTY: Imagen cargada exitosamente')}
                onError={(e) => console.error('❌ HERO-SPECIALTY: Error cargando imagen:', e)}
              />              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent transition-all duration-300"
                suppressHydrationWarning={true}
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSpecialty;