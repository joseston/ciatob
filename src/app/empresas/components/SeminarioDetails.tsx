// src/app/empresas/components/SeminarioDetails.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Monitor, MapPin, CheckCircle, User } from 'lucide-react';
import { seminariosDisponibles, SeminarioDisponible } from '../data/seminarios-disponibles';

const SeminarioDetails = () => {
  const [seminarioSeleccionado, setSeminarioSeleccionado] = useState<SeminarioDisponible>(seminariosDisponibles[0]);
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState<'presencial' | 'virtual' | 'hibrida'>('presencial');

  const modalidadIcons = {
    presencial: MapPin,
    virtual: Monitor,
    hibrida: Users
  };

  const modalidadLabels = {
    presencial: 'Presencial en Empresa',
    virtual: 'Virtual / Zoom',
    hibrida: 'Híbrida (Presencial + Virtual)'
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Seminarios de <span className="text-[#02283b]">Actualización Médica</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dirigidos por el Dr. Helard Manrique y equipo especializado. 
            Contenido científico actualizado adaptado a las necesidades de su empresa.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de Seminarios */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Seminarios Disponibles</h3>
            <div className="space-y-4">
              {seminariosDisponibles.map((seminario, index) => (
                <motion.div
                  key={seminario.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSeminarioSeleccionado(seminario)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    seminarioSeleccionado.id === seminario.id
                      ? 'border-[#02283b] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{seminario.titulo}</h4>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {seminario.duracion}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    {seminario.especialista}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{seminario.audiencia}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detalles del Seminario Seleccionado */}
          <div className="lg:col-span-2">
            <motion.div
              key={seminarioSeleccionado.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8"
            >
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{seminarioSeleccionado.titulo}</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{seminarioSeleccionado.duracion}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-2" />
                    <span>{seminarioSeleccionado.especialista}</span>
                  </div>
                </div>
              </div>

              {/* Modalidades */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Modalidades Disponibles</h4>
                <div className="flex flex-wrap gap-3">
                  {(['presencial', 'virtual', 'hibrida'] as const).map((modalidad) => {
                    const IconComponent = modalidadIcons[modalidad];
                    const isDisponible = seminarioSeleccionado.modalidad === modalidad || seminarioSeleccionado.modalidad === 'hibrida';
                    
                    return (
                      <button
                        key={modalidad}
                        onClick={() => setModalidadSeleccionada(modalidad)}
                        disabled={!isDisponible}
                        className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                          modalidadSeleccionada === modalidad && isDisponible
                            ? 'border-[#02283b] bg-[#02283b] text-white'
                            : isDisponible
                            ? 'border-gray-300 hover:border-[#02283b] text-gray-700'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {modalidadLabels[modalidad]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Objetivos */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Objetivos del Seminario</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {seminarioSeleccionado.objetivos.map((objetivo, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objetivo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contenido */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Contenido del Seminario</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {seminarioSeleccionado.contenido.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-[#02283b] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audiencia */}
              <div className="bg-white rounded-lg p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Audiencia Objetivo</h4>
                <p className="text-gray-600">{seminarioSeleccionado.audiencia}</p>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 bg-[#02283b] text-white rounded-lg font-bold hover:bg-blue-800 transition-colors"
                >
                  Solicitar Este Seminario
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-3 border-2 border-[#02283b] text-[#02283b] rounded-lg font-bold hover:bg-[#02283b] hover:text-white transition-colors"
                >
                  Solicitar Cotización
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Información Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#02283b] to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">¿Necesita un Seminario Personalizado?</h3>
          <p className="text-xl mb-6 opacity-90">
            Podemos adaptar el contenido específicamente a las necesidades de su empresa y sector
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-[#02283b] rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Solicitar Seminario Personalizado
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeminarioDetails;
