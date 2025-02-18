// src/components/specialty/treatment-section.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Activity, Droplet, Microscope, LineChart } from 'lucide-react';

interface Treatment {
  icon: React.ElementType;
  title: string;
  description: string;
}

const TreatmentSection: React.FC = () => {
  const treatments: Treatment[] = [
    {
      icon: Droplet,
      title: "Control Hormonal",
      description: "Evaluación y regulación de los niveles hormonales para optimizar el metabolismo y control del peso."
    },
    {
      icon: Activity,
      title: "Manejo Metabólico",
      description: "Tratamiento personalizado de alteraciones metabólicas y control de factores de riesgo cardiovascular."
    },
    {
      icon: Microscope,
      title: "Diagnóstico Especializado",
      description: "Evaluación integral con pruebas especializadas para identificar causas subyacentes de la obesidad."
    },
    {
      icon: LineChart,
      title: "Seguimiento Continuo",
      description: "Monitoreo regular de progreso y ajustes del tratamiento para garantizar resultados óptimos."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tratamientos Especializados en{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                Endocrinología
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro enfoque integral combina las últimas tecnologías y tratamientos basados en evidencia para abordar la obesidad desde una perspectiva endocrinológica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {treatments.map((treatment, index) => (
                <motion.div
                  key={treatment.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#46b1b9] to-[#22616a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <treatment.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {treatment.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {treatment.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src="https://static.scieluxe.com/files/endocrinologia.jpg"
              alt="Tratamientos endocrinológicos en CIATOB"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;