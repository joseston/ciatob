// src/app/empresas/components/ServiciosCorporativos.tsx
// src/app/empresas/components/ServiciosCorporativos.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Apple, Brain, Dumbbell, CheckCircle, Clock, Users } from 'lucide-react';

const ServiciosCorporativos: React.FC = () => {
  const servicios = [
    {
      icon: Stethoscope,
      titulo: "Evaluaciones Médicas Empresariales",
      descripcion: "Evaluaciones integrales de salud metabólica y hormonal realizadas por endocrinólogos especializados.",
      beneficios: [
        "Detección temprana de diabetes y síndrome metabólico",
        "Evaluación hormonal para optimizar energía",
        "Recomendaciones médicas personalizadas",
        "Prevención de enfermedades costosas"
      ],
      duracion: "45 min por colaborador",
      modalidad: "Presencial",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Apple,
      titulo: "Talleres de Alimentación Saludable",
      descripcion: "Programas educativos prácticos sobre nutrición corporativa, adaptados al entorno laboral.",
      beneficios: [
        "Mejora de energía y concentración",
        "Reducción del cansancio post-almuerzo",
        "Optimización del rendimiento cerebral",
        "Estrategias para horarios irregulares"
      ],
      duracion: "90 min por taller",
      modalidad: "Híbrida",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      titulo: "Manejo de Estrés y Bienestar Mental",
      descripcion: "Sesiones especializadas en técnicas de manejo del estrés laboral y construcción de resiliencia.",
      beneficios: [
        "Reducción del burnout y estrés",
        "Mejora en toma de decisiones",
        "Fortalecimiento de relaciones interpersonales",
        "Técnicas de relajación aplicables"
      ],
      duracion: "60 min por sesión",
      modalidad: "Híbrida",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Dumbbell,
      titulo: "Programas de Actividad Física Laboral",
      descripcion: "Programas de ejercicio diseñados para el entorno corporativo, incluyendo pausas activas.",
      beneficios: [
        "Reducción de dolores posturales",
        "Mejora de circulación y energía",
        "Fortalecimiento del sistema inmune",
        "Reducción del ausentismo por lesiones"
      ],
      duracion: "30-60 min",
      modalidad: "Presencial",
      color: "from-orange-500 to-orange-600"
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="servicios-corporativos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#02283b]/10 text-[#02283b] rounded-full mb-6">
            <Stethoscope className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Servicios Especializados</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-transparent bg-clip-text">
              Servicios Corporativos
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Adaptamos nuestras especialidades médicas al entorno empresarial para crear 
            programas efectivos que transformen la salud de sus colaboradores.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {servicios.map((servicio) => (
            <motion.div
              key={servicio.titulo}
              variants={itemVariants}
              className="group relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 h-full">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${servicio.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <servicio.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {servicio.titulo}
                    </h3>
                    <p className="text-gray-600">{servicio.descripcion}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Beneficios principales:</h4>
                  <div className="space-y-3">
                    {servicio.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{servicio.duracion}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{servicio.modalidad}</span>
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${servicio.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Enfoque Multidisciplinario Integrado
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Lo que nos diferencia es que nuestros servicios no funcionan de manera aislada. 
            Trabajamos como un equipo coordinado para abordar todos los aspectos que influyen 
            en la salud y productividad de sus colaboradores.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Stethoscope, label: "Salud Metabólica" },
              { icon: Apple, label: "Nutrición Inteligente" },
              { icon: Brain, label: "Bienestar Mental" },
              { icon: Dumbbell, label: "Actividad Física" }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#02283b] rounded-full flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiciosCorporativos;