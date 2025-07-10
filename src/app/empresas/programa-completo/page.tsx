// src/app/empresas/programa-completo/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Users, Clock, Award, CheckCircle } from 'lucide-react';
import { seminariosDisponibles } from '../data/seminarios-disponibles';
import { inBodyBenefits } from '../data/inbody-benefits';
import { sectoresPrioritarios } from '../data/sectores-objetivo';

const ProgramaCompletoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#02283b] to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Programa Empresarial <span className="text-yellow-400">CIATOB</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Seminarios Médicos + Evaluación InBody + Seguimiento Personalizado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-3 bg-white text-[#02283b] rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Descargar Programa PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-[#02283b] transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Solicitar Cotización
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metodología */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Metodología <span className="text-[#02283b]">CIATOB</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro enfoque único combina seminarios médicos especializados con evaluación tecnológica 
              avanzada para generar conciencia y derivar a atención médica personalizada.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                numero: '01',
                titulo: 'Seminario Médico',
                descripcion: 'Actualización dirigida por Dr. Helard y especialistas',
                duracion: '90 minutos',
                icono: Users,
                color: 'bg-blue-500'
              },
              {
                numero: '02',
                titulo: 'Evaluación InBody',
                descripcion: 'Análisis de composición corporal con tecnología de impedanciometría',
                duracion: '15 min/persona',
                icono: Award,
                color: 'bg-green-500'
              },
              {
                numero: '03',
                titulo: 'Seguimiento Individual',
                descripcion: 'Consultas médicas para colaboradores identificados en riesgo',
                duracion: '45 min/consulta',
                icono: CheckCircle,
                color: 'bg-purple-500'
              }
            ].map((fase, index) => {
              const IconComponent = fase.icono;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 ${fase.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-300 mb-2">{fase.numero}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{fase.titulo}</h3>
                  <p className="text-gray-600 mb-3">{fase.descripcion}</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {fase.duracion}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seminarios Disponibles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Seminarios Disponibles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contenido médico actualizado dirigido por especialistas CIATOB
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {seminariosDisponibles.map((seminario, index) => (
              <motion.div
                key={seminario.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{seminario.titulo}</h3>
                <p className="text-gray-600 mb-4">{seminario.especialista}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Objetivos:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {seminario.objetivos.slice(0, 3).map((objetivo, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {objetivo}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{seminario.duracion}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    seminario.modalidad === 'presencial' ? 'bg-blue-100 text-blue-700' :
                    seminario.modalidad === 'virtual' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {seminario.modalidad}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología InBody */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tecnología <span className="text-[#02283b]">InBody</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Análisis científico de composición corporal que va más allá del peso tradicional
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inBodyBenefits.slice(0, 6).map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.titulo}</h3>
                <p className="text-gray-600 mb-4">{benefit.descripcion}</p>
                <div className="flex flex-wrap gap-2">
                  {benefit.metricas.slice(0, 3).map((metrica, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#02283b] text-white px-2 py-1 rounded-full"
                    >
                      {metrica}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectores Especializados */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sectores Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experiencia comprobada en sectores con normativas específicas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {sectoresPrioritarios.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.nombre}</h3>
                <p className="text-gray-600 mb-4">{sector.descripcion}</p>
                
                {sector.casosExito && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-semibold text-green-800">Caso de Éxito:</p>
                    <p className="text-sm text-green-700">{sector.casosExito}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Solución CIATOB:</h4>
                  <p className="text-sm text-gray-600">{sector.solucionCIATOB}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inversión y Contacto */}
      <section className="py-16 bg-gradient-to-r from-[#02283b] to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Inversión desde S/ 25 por colaborador
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Incluye seminario médico + evaluación InBody + identificación de riesgos + 
              derivación a consultas individuales cuando sea necesario
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">Para Empresas Pequeñas</h3>
                <p className="text-4xl font-bold mb-2">S/ 500</p>
                <p className="opacity-90">Hasta 20 colaboradores</p>
                <p className="text-sm opacity-75 mt-2">Seminario + evaluación InBody</p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">Para Empresas Medianas/Grandes</h3>
                <p className="text-4xl font-bold mb-2">S/ 25</p>
                <p className="opacity-90">Por colaborador</p>
                <p className="text-sm opacity-75 mt-2">Programa completo + seguimiento</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-[#02283b] rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Solicitar Cotización Personalizada
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-[#02283b] transition-colors"
              >
                Agendar Reunión
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer del Programa */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Programa Empresarial CIATOB - Dr. Helard Manrique y Equipo Multidisciplinario
          </p>
          <p className="text-gray-400 mt-2">
            Contacto: empresas@ciatob.com | WhatsApp: +51 999 999 999
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProgramaCompletoPage;
