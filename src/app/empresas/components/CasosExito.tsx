// src/app/empresas/components/CasosExito.tsx
// src/app/empresas/components/CasosExito.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Users, Building, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePaquetesEmpresariales } from '../hooks/usePaquetesEmpresariales';

const CasosExito: React.FC = () => {
  const { casosExito, loading, error } = usePaquetesEmpresariales();
  const [currentCase, setCurrentCase] = useState(0);

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % casosExito.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + casosExito.length) % casosExito.length);
  };

  const goToCase = (index: number) => {
    setCurrentCase(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02283b] mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando casos de éxito...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || casosExito.length === 0) {
    return null;
  }

  const currentCaso = casosExito[currentCase];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
            <Trophy className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Casos de Éxito Reales</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Resultados{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
              comprobados
            </span>{' '}
            en empresas como la suya
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra cómo hemos transformado la salud y productividad de organizaciones 
            de diferentes sectores e industrias.
          </p>
        </motion.div>

        {/* Main Case Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content Side */}
                <div className="p-8 md:p-12">
                  {/* Company Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentCaso.empresaNombre}</h3>
                      <p className="text-gray-600">{currentCaso.sector} • {currentCaso.empleados} empleados</p>
                    </div>
                  </div>

                  {/* Problem */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">El Desafío:</h4>
                    <p className="text-gray-700 leading-relaxed">{currentCaso.problema}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Nuestra Solución:</h4>
                    <p className="text-gray-700 leading-relaxed">{currentCaso.solucion}</p>
                  </div>

                  {/* Results */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Resultados Obtenidos:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {currentCaso.resultados.map((resultado, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                        >
                          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-green-800">{resultado}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <Quote className="w-8 h-8 text-gray-400 mb-4" />
                    <p className="text-gray-700 italic mb-4 leading-relaxed">
                      &ldquo;{currentCaso.testimonial.comentario}&rdquo;
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {currentCaso.testimonial.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{currentCaso.testimonial.nombre}</p>
                        <p className="text-sm text-gray-600">{currentCaso.testimonial.cargo}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Side */}
                <div className="bg-gradient-to-br from-[#02283b] to-[#1a4a5c] p-8 md:p-12 text-white flex flex-col justify-center">
                  <h4 className="text-2xl font-bold mb-8 text-center">Métricas de Impacto</h4>
                  
                  <div className="space-y-8">
                    {currentCaso.metricas.ausentismo && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="text-4xl font-bold mb-2">{currentCaso.metricas.ausentismo}</div>
                        <div className="text-white/80">Reducción de Ausentismo</div>
                      </motion.div>
                    )}

                    {currentCaso.metricas.satisfaccion && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                      >
                        <div className="text-4xl font-bold mb-2">{currentCaso.metricas.satisfaccion}</div>
                        <div className="text-white/80">Satisfacción Laboral</div>
                      </motion.div>
                    )}

                    {currentCaso.metricas.productividad && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center"
                      >
                        <div className="text-4xl font-bold mb-2">{currentCaso.metricas.productividad}</div>
                        <div className="text-white/80">Incremento de Productividad</div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-8 p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Tiempo de implementación: 3-6 meses</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevCase}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextCase}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Case Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {casosExito.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCase(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentCase 
                  ? 'bg-[#02283b]' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para ser nuestro próximo caso de éxito?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Únase a las empresas que ya están transformando la salud y productividad 
            de sus colaboradores con CIATOB.
          </p>
          
          <button
            onClick={() => {
              const elemento = document.getElementById('contacto-empresarial');
              if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Solicitar propuesta personalizada
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CasosExito;