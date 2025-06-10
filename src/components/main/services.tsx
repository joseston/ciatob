'use client';

import { motion } from 'framer-motion';
import { Droplet, Leaf, Smile, Dumbbell, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Droplet,
      title: "Endocrinología",
      description: "Evaluación y tratamiento hormonal especializado para el control del peso y trastornos metabólicos.",
      route: "/endocrinologia",
      primaryColor: "#02283b",
      secondaryColor: "#1a4a5c",
      gradient: "from-[#02283b] to-[#1a4a5c]",
      bgGradient: "from-[#02283b]/5 via-[#02283b]/10 to-[#1a4a5c]/15",
      hoverBg: "group-hover:from-[#02283b]/20 group-hover:to-[#1a4a5c]/30",
      glowColor: "shadow-[#02283b]/20",
      specialties: ["Control Hormonal", "Metabolismo", "Diabetes"]
    },
    {
      icon: Leaf,
      title: "Nutrición",
      description: "Planes alimenticios personalizados y educación nutricional adaptada a tu estilo de vida.",
      route: "/nutricion",
      primaryColor: "#d29113",
      secondaryColor: "#b8781a",
      gradient: "from-[#d29113] to-[#b8781a]",
      bgGradient: "from-[#d29113]/5 via-[#d29113]/10 to-[#b8781a]/15",
      hoverBg: "group-hover:from-[#d29113]/20 group-hover:to-[#b8781a]/30",
      glowColor: "shadow-[#d29113]/20",
      specialties: ["Planes Personalizados", "Educación", "Seguimiento"]
    },
    {
      icon: Smile,
      title: "Psicología",
      description: "Apoyo psicológico y terapéutico para desarrollar hábitos saludables y una relación positiva con la alimentación.",
      route: "/psicologia",
      primaryColor: "#b72955",
      secondaryColor: "#a02348",
      gradient: "from-[#b72955] to-[#a02348]",
      bgGradient: "from-[#b72955]/5 via-[#b72955]/10 to-[#a02348]/15",
      hoverBg: "group-hover:from-[#b72955]/20 group-hover:to-[#a02348]/30",
      glowColor: "shadow-[#b72955]/20",
      specialties: ["Terapia Conductual", "Autoestima", "Hábitos"]
    },
    {
      icon: Dumbbell,
      title: "Medicina Deportiva",
      description: "Prescripción de ejercicio personalizado y seguimiento de la actividad física para optimizar resultados.",
      route: "/medicina-deportiva",
      primaryColor: "#398e43",
      secondaryColor: "#2d7235",
      gradient: "from-[#398e43] to-[#2d7235]",
      bgGradient: "from-[#398e43]/5 via-[#398e43]/10 to-[#2d7235]/15",
      hoverBg: "group-hover:from-[#398e43]/20 group-hover:to-[#2d7235]/30",
      glowColor: "shadow-[#398e43]/20",
      specialties: ["Ejercicio Terapéutico"]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-100/40 to-pink-100/40 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#02283b] rounded-full border border-[#02283b] mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-2xl font-bold text-white">Nuestras Especialidades</span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nuestro enfoque multidisciplinario combina las mejores prácticas médicas con tecnología avanzada 
            para ofrecerte resultados duraderos y transformar tu calidad de vida.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${service.bgGradient} ${service.hoverBg} backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl ${service.glowColor} hover:shadow-xl hover:-translate-y-2`}>

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 group-hover:text-gray-200 leading-relaxed text-sm transition-colors">
                    {service.description}
                  </p>

                  {/* Specialties Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/60 group-hover:bg-white/20 text-gray-700 group-hover:text-white text-xs rounded-lg font-medium border border-white/40 group-hover:border-white/60 transition-all"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={service.route} className="block mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl`}
                    style={{
                      boxShadow: hoveredIndex === index ? `0 20px 40px ${service.primaryColor}40` : undefined
                    }}
                  >
                    <span>Conocer más</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.button>
                </Link>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;