'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react';

interface ServicioDetalleProps {
  servicio: {
    id: string;
    titulo: string;
    descripcion: string;
    descripcionDetallada: string;
    precio: string;
    precioOriginal?: string;
    duracion: string;
    ubicacion: string;
    imagenes: string[];
    beneficios: string[];
    incluye: string[];
    testimonios: {
      nombre: string;
      comentario: string;
      rating: number;
      fecha: string;
    }[];
    promocion?: {
      tipo: string;
      descuento: string;
      vigencia: string;
    };
  };
}

export default function ServicioDetalle({ servicio }: ServicioDetalleProps) {
  const [imagenActiva, setImagenActiva] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    mensaje: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí integrarías con tu backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen principal */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{servicio.titulo}</h1>
            <p className="text-xl mb-6">{servicio.descripcion}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de imágenes */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Galería</h2>
              <div className="space-y-4">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={servicio.imagenes[imagenActiva]}
                    alt={servicio.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {servicio.imagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActiva(index)}
                      className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 ${
                        imagenActiva === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={imagen}
                        alt={`Vista ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Descripción detallada */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Descripción del Servicio</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{servicio.descripcionDetallada}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Beneficios</h3>
                  <ul className="space-y-2">
                    {servicio.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Incluye</h3>
                  <ul className="space-y-2">
                    {servicio.incluye.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Testimonios */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Testimonios</h2>
              <div className="space-y-6">
                {servicio.testimonios.map((testimonio, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonio.rating ? 'fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-semibold">{testimonio.nombre}</span>                      <span className="ml-2 text-gray-500 text-sm">{testimonio.fecha}</span>
                    </div>
                    <p className="text-gray-700 italic">&ldquo;{testimonio.comentario}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar con información y formulario */}
          <div className="space-y-6">
            {/* Información del servicio */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Información del Servicio</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Precio:</span>
                  <div className="text-right">
                    {servicio.precioOriginal && (
                      <span className="text-gray-500 line-through text-sm">{servicio.precioOriginal}</span>
                    )}
                    <span className="text-2xl font-bold text-blue-600 ml-2">{servicio.precio}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{servicio.duracion}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{servicio.ubicacion}</span>
                </div>

                {servicio.promocion && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 font-semibold">¡Oferta especial!</p>
                    <p className="text-red-700 text-sm">Válida hasta: {servicio.promocion.vigencia}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Reservar Cita</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha preferida
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Reservar Cita
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">¿Prefieres contactarnos directamente?</p>
                <div className="space-y-2">
                  <a href="tel:+1234567890" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">+123 456 7890</span>
                  </a>
                  <a href="mailto:info@ciatob.com" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">info@ciatob.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}