// src/app/empresas/components/ProcesoImplementacion.tsx
// src/app/empresas/components/ProcesoImplementacion.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Play, TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const ProcesoImplementacion: React.FC = () => {
  const pasos = [
    {
      numero: 1,
      titulo: 'Diagnóstico Empresarial',
      descripcion: 'Evaluamos las necesidades específicas de tu empresa, analizamos el perfil de colaboradores y identificamos las principales áreas de oportunidad.',
      duracion: '1-2 semanas',
      icon: Search,
      color: 'from-blue-500 to-blue-600',
      actividades: [
        'Reunión inicial con equipo directivo',
        'Encuesta de salud y bienestar a colaboradores',
        'Análisis de ausentismo y productividad',
        'Evaluación del ambiente laboral',
        'Identificación de necesidades prioritarias'
      ]
    },
    {
      numero: 2,
      titulo: 'Diseño del Programa',
      descripcion: 'Creamos un programa personalizado que se adapte a tu cultura organizacional, horarios y objetivos específicos de bienestar.',
      duracion: '1 semana',
      icon: Settings,
      color: 'from-green-500 to-green-600',
      actividades: [
        'Diseño de programa personalizado',
        'Selección de especialistas asignados',
        'Cronograma de implementación',
        'Definición de métricas de éxito',
        'Aprobación final del plan'
      ]
    },
    {
      numero: 3,
      titulo: 'Implementación',
      descripcion: 'Ejecutamos el programa con nuestro equipo multidisciplinario, ya sea en tus instalaciones o de forma virtual según convenga.',
      duracion: 'Según paquete',
      icon: Play,
      color: 'from-purple-500 to-purple-600',
      actividades: [
        'Kick-off con todos los colaboradores',
        'Ejecución de talleres y consultas',
        'Evaluaciones médicas programadas',
        'Seguimiento semanal de participación',
        'Ajustes según feedback recibido'
      ]
    },
    {
      numero: 4,
      titulo: 'Seguimiento y Resultados',
      descripcion: 'Monitoreamos el progreso, medimos resultados y ajustamos el programa para maximizar el impacto en tu organización.',
      duracion: 'Continuo',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      actividades: [
        'Reportes mensuales de progreso',
        'Análisis de métricas de impacto',
        'Encuestas de satisfacción',
        'Ajustes y optimizaciones',
        'Planificación de siguientes fases'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section className="py-20 bg-white">
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
            <Settings className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Proceso de Implementación</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Cómo{' '}
            <span className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-transparent bg-clip-text">
              implementamos
            </span>{' '}
            su programa de bienestar
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Un proceso estructurado y probado que garantiza la exitosa implementación 
            del programa de bienestar en su empresa.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {pasos.map((paso, index) => (
            <motion.div
              key={paso.numero}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${paso.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {paso.numero}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{paso.titulo}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{paso.duracion}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {paso.descripcion}
                </p>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Actividades principales:</h4>
                  <div className="space-y-3">
                    {paso.actividades.map((actividad, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{actividad}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className={`w-80 h-80 rounded-full bg-gradient-to-br ${paso.color} flex items-center justify-center relative overflow-hidden`}>
                    {/* Icon */}
                    <paso.icon className="w-32 h-32 text-white/90" />
                    
                    {/* Decorative circles */}
                    <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-12 left-12 w-12 h-12 bg-white/10 rounded-full"></div>
                    <div className="absolute top-1/2 left-8 w-8 h-8 bg-white/10 rounded-full"></div>
                  </div>
                  
                  {/* Number badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-100">
                    <span className="text-2xl font-bold text-gray-900">{paso.numero}</span>
                  </div>
                </motion.div>
              </div>

              {/* Connection Line */}
              {index < pasos.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-96">
                  <div className={`w-1 h-16 bg-gradient-to-b ${paso.color} opacity-30`}></div>
                  <ArrowRight className="w-6 h-6 text-gray-400 mx-auto mt-2" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Resumen del Cronograma
            </h3>
            <p className="text-lg text-gray-600">
              Tiempo estimado desde el primer contacto hasta la implementación completa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pasos.map((paso, index) => (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${paso.color} flex items-center justify-center text-white font-bold mx-auto mb-3`}>
                  {paso.numero}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h4>
                <p className="text-sm text-gray-600">{paso.duracion}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
              <Clock className="w-5 h-5 text-[#02283b] mr-2" />
              <span className="font-semibold text-gray-900">Tiempo total: 4-6 semanas hasta implementación completa</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar el proceso?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Inicie hoy mismo el diagnóstico gratuito de su empresa y descubra 
            cómo podemos transformar la salud de sus colaboradores.
          </p>
          
          <button
            onClick={() => {
              const elemento = document.getElementById('contacto-empresarial');
              if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            Iniciar diagnóstico gratuito
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcesoImplementacion;