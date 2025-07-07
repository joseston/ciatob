// src/app/empresas/propuesta/page.tsx
// src/app/empresas/propuesta/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Building, 
  Users, 
  Target, 
  Calendar, 
  CheckCircle, 
  ArrowLeft,
  FileText,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import { useEmpresaContact } from '../hooks/useEmpresaContact';

export default function PropuestaPage() {
  const router = useRouter();
  const { loading, success, error, solicitarPropuesta } = useEmpresaContact();
  
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    contacto: '',
    email: '',
    telefono: '',
    empleados: '',
    sector: '',
    necesidades: ''
  });

  const sectores = [
    'Tecnología',
    'Financiero',
    'Salud',
    'Educación',
    'Manufactura',
    'Servicios',
    'Retail',
    'Construcción',
    'Otro'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await solicitarPropuesta(formData);
  };

  const beneficiosPropuesta = [
    {
      icon: FileText,
      title: 'Análisis detallado',
      description: 'Evaluación específica de las necesidades de su empresa'
    },
    {
      icon: Target,
      title: 'Solución personalizada',
      description: 'Programa diseñado exclusivamente para su organización'
    },
    {
      icon: TrendingUp,
      title: 'ROI estimado',
      description: 'Proyección del retorno de inversión esperado'
    },
    {
      icon: Clock,
      title: 'Cronograma flexible',
      description: 'Plan de implementación adaptado a sus tiempos'
    }
  ];

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Solicitud enviada exitosamente!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Hemos recibido su solicitud de propuesta personalizada. Nuestro equipo comercial 
              se contactará con usted en las próximas 24 horas para coordinar una reunión 
              y elaborar su propuesta específica.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Próximos pasos:</h3>
              <ul className="text-green-700 space-y-2 text-left">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Llamada inicial para entender sus necesidades (24 horas)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Diagnóstico gratuito de su empresa (1-2 semanas)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Presentación de propuesta personalizada (3-5 días)
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/empresas')}
                className="bg-[#02283b] hover:bg-[#1a4a5c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Volver a empresas
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ir al inicio
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solicitud de Propuesta Personalizada
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Complete el formulario y reciba una propuesta específica para las necesidades 
              de bienestar corporativo de su empresa.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Información de su empresa
              </h2>
              <p className="text-gray-600">
                Proporcione los detalles de su organización para crear una propuesta adaptada.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Empresa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Nombre de la empresa *
                </label>
                <input
                  type="text"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                  placeholder="Ingrese el nombre de su empresa"
                />
              </div>

              {/* Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del contacto *
                  </label>
                  <input
                    type="text"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                    placeholder="Su nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email corporativo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                    placeholder="email@empresa.com"
                  />
                </div>
              </div>

              {/* Teléfono y empleados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                    placeholder="+51 xxx xxx xxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Número de empleados *
                  </label>
                  <select
                    name="empleados"
                    value={formData.empleados}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                  >
                    <option value="">Seleccione...</option>
                    <option value="1-50">1 - 50 empleados</option>
                    <option value="51-100">51 - 100 empleados</option>
                    <option value="101-200">101 - 200 empleados</option>
                    <option value="201-500">201 - 500 empleados</option>
                    <option value="500+">Más de 500 empleados</option>
                  </select>
                </div>
              </div>

              {/* Sector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector de la empresa *
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                >
                  <option value="">Seleccione el sector...</option>
                  {sectores.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              {/* Necesidades */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-2" />
                  Necesidades específicas y objetivos *
                </label>
                <textarea
                  name="necesidades"
                  value={formData.necesidades}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
                  placeholder="Describa los principales desafíos de su empresa y qué espera lograr con nuestro programa de bienestar corporativo..."
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#02283b] to-[#1a4a5c] hover:shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Enviando solicitud...
                  </div>
                ) : (
                  'Solicitar propuesta personalizada'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Benefits Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Benefits */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ¿Qué incluye su propuesta personalizada?
              </h3>
              
              <div className="space-y-6">
                {beneficiosPropuesta.map((beneficio, index) => (
                  <motion.div
                    key={beneficio.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center flex-shrink-0">
                      <beneficio.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{beneficio.title}</h4>
                      <p className="text-gray-600">{beneficio.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Cronograma de respuesta</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-semibold">24 horas</p>
                    <p className="text-white/80 text-sm">Contacto inicial</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-semibold">3-5 días</p>
                    <p className="text-white/80 text-sm">Análisis y diseño</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-semibold">1 semana</p>
                    <p className="text-white/80 text-sm">Presentación de propuesta</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <p className="text-white/90 text-sm">
                  <Award className="w-4 h-4 inline mr-2" />
                  <strong>Sin compromiso:</strong> La consulta y propuesta son completamente gratuitas
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}