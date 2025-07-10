// src/app/empresas/components/TargetEmpresarial.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, HardHat, Shield, Headphones, Banknote, Monitor, Factory } from 'lucide-react';
import { sectoresObjetivo, sectoresPrioritarios } from '../data/sectores-objetivo';

const iconMap = {
  'mineria': HardHat,
  'construccion': Building2,
  'seguridad-publica': Shield,
  'call-centers': Headphones,
  'financiero': Banknote,
  'tecnologia': Monitor,
  'manufactura': Factory,
};

const priorityColors = {
  alta: 'bg-red-500',
  media: 'bg-yellow-500',
  baja: 'bg-green-500'
};

const TargetEmpresarial = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sectores <span className="text-[#02283b]">Especializados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programas médicos adaptados a las necesidades específicas de cada sector empresarial, 
            con especial experiencia en empresas que requieren cumplimiento normativo.
          </p>
        </motion.div>

        {/* Sectores Prioritarios */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Sectores Prioritarios
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Experiencia comprobada y alta demanda
            </span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectoresPrioritarios.map((sector, index) => {
              const IconComponent = iconMap[sector.id as keyof typeof iconMap] || Building2;
              
              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-[#02283b]"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#02283b] rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{sector.nombre}</h4>
                      <div className="flex items-center mt-1">
                        <div className={`w-2 h-2 rounded-full ${priorityColors[sector.prioridadComercial]} mr-2`}></div>
                        <span className="text-sm text-gray-600 capitalize">Prioridad {sector.prioridadComercial}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{sector.descripcion}</p>
                  
                  {/* Caso de Éxito */}
                  {sector.casosExito && (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-3 border-green-400">
                      <p className="text-sm font-semibold text-green-800">Caso de Éxito:</p>
                      <p className="text-sm text-green-700">{sector.casosExito}</p>
                    </div>
                  )}
                  
                  {/* Necesidades Específicas */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Necesidades Específicas:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {sector.necesidadesEspecificas.slice(0, 3).map((necesidad, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-[#02283b] rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {necesidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Solución CIATOB */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">Nuestra Solución:</h5>
                    <p className="text-sm text-blue-700">{sector.solucionCIATOB}</p>
                  </div>
                  
                  {/* Normativas */}
                  {sector.normativasAplicables && sector.normativasAplicables.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Normativas que Cumplimos:</h5>
                      <div className="flex flex-wrap gap-1">
                        {sector.normativasAplicables.slice(0, 2).map((normativa, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {normativa.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 px-4 py-2 bg-[#02283b] text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Solicitar Propuesta
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Otros Sectores */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Otros Sectores Atendidos
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectoresObjetivo.filter(s => s.prioridadComercial !== 'alta').map((sector, index) => {
              const IconComponent = iconMap[sector.id as keyof typeof iconMap] || Building2;
              
              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{sector.nombre}</h4>
                      <div className={`w-2 h-2 rounded-full ${priorityColors[sector.prioridadComercial]} inline-block`}></div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{sector.descripcion}</p>
                  
                  <button className="w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:border-[#02283b] hover:text-[#02283b] transition-colors">
                    Más Información
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#02283b] to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              ¿Su Sector No Está Listado?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Adaptamos nuestros programas a cualquier tipo de empresa. 
              Contáctenos para una propuesta personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#02283b] rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Consultar Mi Sector
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-[#02283b] transition-colors"
              >
                Ver Todos los Sectores
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetEmpresarial;
