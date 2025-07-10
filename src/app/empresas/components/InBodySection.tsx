// src/app/empresas/components/InBodySection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart, Calendar, Heart, Droplets, TrendingUp } from 'lucide-react';
import { inBodyBenefits, ventajasInBodyEmpresarial, diferenciadorInBody } from '../data/inbody-benefits';

const iconMap = {
  BarChart,
  Calendar,
  Heart,
  Droplets,
  Activity,
  TrendingUp,
};

const InBodySection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tecnología <span className="text-[#02283b]">InBody</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Análisis científico de composición corporal que revoluciona las evaluaciones empresariales. 
              La única tecnología que determina la edad biológica vs cronológica de sus colaboradores.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#02283b] mb-4">{diferenciadorInBody.titulo}</h3>
              <p className="text-gray-600 mb-6">{diferenciadorInBody.descripcion}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {diferenciadorInBody.ventajas.map((ventaja, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#02283b] rounded-full"></div>
                    <span className="text-gray-700">{ventaja}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Beneficios InBody */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            ¿Qué Evalúa la Tecnología InBody?
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inBodyBenefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icono as keyof typeof iconMap];
              
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#02283b] rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{benefit.titulo}</h4>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{benefit.descripcion}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-[#02283b] mb-2">Aplicación Empresarial:</p>
                    <p className="text-sm text-gray-600">{benefit.aplicacionEmpresarial}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Métricas Incluidas:</p>
                    <div className="flex flex-wrap gap-1">
                      {benefit.metricas.map((metrica, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {metrica}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ventajas Empresariales */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Ventajas para su Empresa
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ventajasInBodyEmpresarial.map((ventaja, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#02283b] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{ventaja.titulo}</h4>
                <p className="text-gray-600 mb-3">{ventaja.descripcion}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-semibold text-[#02283b]">{ventaja.beneficio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#02283b] to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              ¿Listo para Conocer la Verdadera Condición de sus Colaboradores?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Solicite una demostración de la tecnología InBody en su empresa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#02283b] rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Solicitar Demostración
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-[#02283b] transition-colors"
              >
                Descargar Brochure InBody
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InBodySection;
