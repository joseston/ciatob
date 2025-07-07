// src/app/empresas/components/PaquetesEmpresariales.tsx
// src/app/empresas/components/PaquetesEmpresariales.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle } from 'lucide-react';
import PaqueteCard from './PaqueteCard';
import { usePaquetesEmpresariales } from '../hooks/usePaquetesEmpresariales';

const PaquetesEmpresariales: React.FC = () => {
  const { paquetes, loading, error } = usePaquetesEmpresariales();

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

  const beneficiosGenerales = [
    "Evaluación gratuita de necesidades empresariales",
    "Equipo multidisciplinario especializado",
    "Programas adaptados a su cultura organizacional",
    "Métricas y reportes de resultados",
    "Soporte continuo durante la implementación",
    "Garantía de satisfacción"
  ];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02283b] mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando paquetes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#02283b]/10 text-[#02283b] rounded-full mb-6">
            <Package className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Paquetes Corporativos</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Elija el{' '}
            <span className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-transparent bg-clip-text">
              paquete ideal
            </span>{' '}
            para su empresa
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos diferentes niveles de atención para adaptarnos al tamaño, 
            necesidades y presupuesto de su organización.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-4"
        >
          {paquetes.map((paquete) => (
            <motion.div
              key={paquete.id}
              variants={itemVariants}
            >
              <PaqueteCard paquete={paquete} />
            </motion.div>
          ))}
        </motion.div>

        {/* General Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-4 md:p-6 shadow-lg border border-gray-100 mb-4"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Todos nuestros paquetes incluyen
            </h3>
            <p className="text-lg text-gray-600">
              Beneficios adicionales que garantizan el éxito de su programa de bienestar corporativo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficiosGenerales.map((beneficio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{beneficio}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaquetesEmpresariales;