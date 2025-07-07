// src/app/empresas/components/ProblemasSection.tsx
// src/app/empresas/components/ProblemasSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Clock, Users, Brain, Activity } from 'lucide-react';

const ProblemasSection: React.FC = () => {
  const problemas = [
    {
      icon: Clock,
      titulo: "Alto Ausentismo Laboral",
      descripcion: "Empleados que faltan frecuentemente por problemas de salud relacionados con estrés, obesidad y enfermedades metabólicas.",
      estadistica: "25% promedio",
      color: "from-red-500 to-red-600"
    },
    {
      icon: TrendingDown,
      titulo: "Baja Productividad",
      descripcion: "Fatiga, falta de energía y problemas de concentración que afectan el rendimiento laboral y la calidad del trabajo.",
      estadistica: "-30% eficiencia",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Brain,
      titulo: "Estrés y Burnout",
      descripcion: "Altos niveles de estrés laboral que conducen a agotamiento mental, ansiedad y problemas de salud mental.",
      estadistica: "60% empleados",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Activity,
      titulo: "Sedentarismo Extremo",
      descripcion: "Largos períodos sentados y falta de actividad física durante la jornada laboral, creando problemas posturales y metabólicos.",
      estadistica: "8+ horas diarias",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      titulo: "Clima Organizacional",
      descripcion: "Ambiente laboral deteriorado por empleados desmotivados, enfermos o estresados que afecta a todo el equipo.",
      estadistica: "40% insatisfacción",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: AlertTriangle,
      titulo: "Costos Médicos Elevados",
      descripcion: "Gastos crecientes en seguros médicos y tratamientos de enfermedades prevenibles relacionadas con el estilo de vida.",
      estadistica: "+50% gastos",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full mb-6">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Problemas Empresariales Comunes</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Su empresa enfrenta estos{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 text-transparent bg-clip-text">
              desafíos
            </span>
            ?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estos problemas son más comunes de lo que piensa y tienen un impacto directo 
            en la rentabilidad y sostenibilidad de su negocio.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problemas.map((problema) => (
            <motion.div
              key={problema.titulo}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${problema.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <problema.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {problema.titulo}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {problema.descripcion}
                </p>

                {/* Statistic */}
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${problema.color} text-white text-sm font-semibold`}>
                  {problema.estadistica}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Reconoce estos problemas en su empresa?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              No está solo. Estas situaciones afectan a miles de empresas, 
              pero tienen solución con el enfoque adecuado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const elemento = document.getElementById('servicios-corporativos');
                  if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-[#02283b] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-300"
              >
                Ver nuestras soluciones
              </button>
              
              <button
                onClick={() => {
                  const elemento = document.getElementById('contacto-empresarial');
                  if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#02283b] transform hover:scale-105 transition-all duration-300"
              >
                Solicitar consulta gratuita
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemasSection;