// src/app/empresas/components/ContactoEmpresarial.tsx
// src/app/empresas/components/ContactoEmpresarial.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Clock, Calendar, Users } from 'lucide-react';
import ContactoEmpresaForm from '@/components/forms/ContactoEmpresaForm';

const ContactoEmpresarial: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+51 948 213 270',
      description: 'Línea directa empresarial',
      action: 'tel:+51948213270'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Business',
      value: '+51 948 213 270',
      description: 'Respuesta inmediata',
      action: 'https://wa.me/+51948213270'
    },
    {
      icon: Mail,
      title: 'Email Corporativo',
      value: 'empresas@ciatob.com',
      description: 'Para propuestas detalladas',
      action: 'mailto:empresas@ciatob.com'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Av. Velasco Astete 1952',
      description: 'Santiago de Surco, Lima',
      action: null
    }
  ];

  const horarios = [
    { dia: 'Lunes - Viernes', horario: '8:00 AM - 7:00 PM' },
    { dia: 'Sábados', horario: '9:00 AM - 2:00 PM' },
    { dia: 'Domingos', horario: 'Solo emergencias' }
  ];

  const beneficiosConsulta = [
    'Diagnóstico gratuito de necesidades',
    'Propuesta personalizada sin compromiso',
    'Análisis de ROI estimado',
    'Cronograma de implementación',
    'Reunión con nuestros especialistas'
  ];

  return (
    <section id="contacto-empresarial" className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold">Contacto Empresarial</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comience la{' '}
            <span className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-transparent bg-clip-text">
              transformación
            </span>{' '}
            de su empresa hoy
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solicite una consulta gratuita y descubra cómo podemos mejorar la salud, 
            productividad y bienestar de sus colaboradores.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Solicite su propuesta personalizada
              </h3>
              <p className="text-gray-600">
                Complete el formulario y nos contactaremos en las próximas 24 horas 
                para agendar una reunión y conocer sus necesidades específicas.
              </p>
            </div>

            <ContactoEmpresaForm />
          </motion.div>

          {/* Contact Information & Benefits */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Otras formas de contacto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      {item.action ? (
                        <a
                          href={item.action}
                          className="text-[#02283b] hover:text-[#1a4a5c] font-medium transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-medium">{item.value}</p>
                      )}
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-[#02283b]" />
                <h3 className="text-2xl font-bold text-gray-900">Horarios de atención</h3>
              </div>
              
              <div className="space-y-3">
                {horarios.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 font-medium">{item.dia}</span>
                    <span className="text-gray-900 font-semibold">{item.horario}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-semibold">Reuniones empresariales</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Agendamos reuniones fuera del horario regular según su disponibilidad
                </p>
              </div>
            </motion.div>

            {/* Benefits of Consultation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-3xl shadow-xl p-8 text-white"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6" />
                <h3 className="text-2xl font-bold">¿Qué incluye nuestra consulta gratuita?</h3>
              </div>
              
              <div className="space-y-4">
                {beneficiosConsulta.map((beneficio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-white/90">{beneficio}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
                <p className="text-white/90 text-sm">
                  <strong className="text-white">Tiempo estimado:</strong> 45-60 minutos
                  <br />
                  <strong className="text-white">Modalidad:</strong> Presencial o virtual según su preferencia
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Necesita una respuesta inmediata?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+51948213270"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Escribir por WhatsApp
            </a>
            
            <a
              href="tel:+51948213270"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#02283b] hover:bg-[#1a4a5c] text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar ahora
            </a>
          </div>
          
          <p className="text-gray-600 mt-4">
            Horario de atención: Lunes a Viernes de 8:00 AM a 7:00 PM
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactoEmpresarial;