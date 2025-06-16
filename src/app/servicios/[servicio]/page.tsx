'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle,
  CheckCircle,
  Users,
  Award,
  Heart
} from 'lucide-react';
import { serviciosPromociones } from '../data/servicios-promociones';

interface PageProps {
  params: Promise<{
    servicio: string;
  }>;
}

export default function ServicioDetallePage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const servicio = serviciosPromociones.find(s => s.slug === resolvedParams.servicio);

  if (!servicio) {
    notFound();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#02283b] via-[#1a4a5c] to-[#02283b] text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02283b]/90 to-[#1a4a5c]/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                href="/servicios" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a servicios
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 mb-6">
                  <span className="text-white text-sm font-semibold">
                    {servicio.categoria}
                  </span>                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                  {servicio.titulo}
                </h1>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {servicio.descripcion}
                </p>
                
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-white/90 font-medium">4.9</span>
                  </div>
                  <div className="text-white/90">
                    <Users className="w-5 h-5 inline mr-2" />
                    500+ pacientes
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm mb-1">Precio del paquete</p>
                      <p className="text-3xl font-bold text-white">{servicio.precio}</p>
                    </div>
                    <div className="text-right">
                      <Award className="w-8 h-8 text-amber-400 mb-2" />
                      <p className="text-white/80 text-sm">Mejor valor</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">                  <div className="text-center mb-6">
                    <Image 
                      src="https://static.scieluxe.com/files/ciatob/logo_ciatob_peque%C3%B1o.PNG" 
                      alt="CIATOB Logo" 
                      width={80}
                      height={80}
                      className="mx-auto mb-4 rounded-full bg-white p-2"
                      unoptimized
                    />
                    <h3 className="text-xl font-semibold text-white mb-2">¿Listo para comenzar?</h3>
                    <p className="text-white/80">Agenda tu cita ahora</p>
                  </div>
                  
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/+51948213270"
                      className="block w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-center"
                    >
                      <MessageCircle className="w-5 h-5 inline mr-2" />
                      Contactar por WhatsApp
                    </a>
                    <a
                      href="tel:+51948213270"
                      className="block w-full bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-center border border-white/30"
                    >
                      <Phone className="w-5 h-5 inline mr-2" />
                      Llamar ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Descripción Detallada */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Descripción del Programa</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {servicio.descripcionDetallada}
                </p>
              </motion.div>

              {/* Beneficios */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Beneficios del Programa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {servicio.beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{beneficio}</p>
                    </div>
                  ))}
                </div>
              </motion.div>              {/* Qué incluye */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#02283b]/5 to-[#1a4a5c]/10 rounded-3xl p-8 border border-[#02283b]/10">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">¿Qué incluye este paquete?</h2>
                
                {/* Verificar si el servicio tiene planes básico y avanzado */}
                {servicio.incluye.some(item => item.includes('Plan Básico') || item.includes('Plan Avanzado')) ? (
                  <div className="space-y-8">
                    {/* Plan Básico */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#02283b]/10">
                      <h3 className="text-xl font-bold text-[#02283b] mb-4 flex items-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">B</span>
                        </div>
                        Plan Básico
                      </h3>
                      <div className="space-y-3">
                        {servicio.incluye
                          .filter(item => item.includes('Plan Básico'))
                          .map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-gray-700 font-medium">{item.replace('Plan Básico: ', '')}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Plan Avanzado */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#02283b]/20">
                      <h3 className="text-xl font-bold text-[#02283b] mb-4 flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">A</span>
                        </div>
                        Plan Avanzado
                      </h3>
                      <div className="space-y-3">
                        {servicio.incluye
                          .filter(item => item.includes('Plan Avanzado'))
                          .map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center mt-0.5">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                              <p className="text-gray-700 font-medium">{item.replace('Plan Avanzado: ', '')}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Diseño normal para servicios sin planes diferenciados */
                  <div className="space-y-4">
                    {servicio.incluye.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#02283b] to-[#1a4a5c] rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Testimonios */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Lo que dicen nuestros pacientes</h2>
                <div className="space-y-6">
                  {servicio.testimonios.map((testimonio, index) => (
                    <div key={index} className="border-l-4 border-[#02283b] pl-6 py-4">
                      <div className="flex items-center mb-3">
                        <div className="flex text-amber-400 mr-3">
                          {[...Array(testimonio.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{testimonio.fecha}</span>
                      </div>
                      <p className="text-gray-700 mb-3 italic">&ldquo;{testimonio.comentario}&rdquo;</p>
                      <p className="font-semibold text-gray-900">— {testimonio.nombre}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Información de contacto */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#02283b]" />
                    <span className="text-gray-700">{servicio.ubicacion}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#02283b]" />
                    <span className="text-gray-700">+51 948 213 270</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#02283b]" />
                    <span className="text-gray-700">Lun - Sáb: 8:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </motion.div>              {/* Promoción */}
              {servicio.promocion && (
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#02283b] to-[#1a4a5c] rounded-3xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4 text-white">Promoción Especial</h3>
                  <div className="space-y-3">
                    <p className="text-white"><strong className="text-white">Tipo:</strong> {servicio.promocion.tipo}</p>
                    <p className="text-white"><strong className="text-white">Descuento:</strong> {servicio.promocion.descuento}</p>
                    <p className="text-white"><strong className="text-white">Válido hasta:</strong> {servicio.promocion.vigencia}</p>
                  </div>
                </motion.div>
              )}

              {/* CTA Final */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#02283b]/5 to-[#1a4a5c]/10 rounded-3xl p-6 border border-[#02283b]/10 text-center">
                <Heart className="w-12 h-12 text-[#02283b] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Tienes preguntas?</h3>
                <p className="text-gray-600 mb-6">Nuestro equipo está aquí para ayudarte</p>
                <a
                  href="https://wa.me/+51948213270"
                  className="inline-flex items-center bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Consultar ahora
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}