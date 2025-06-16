'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    titulo: string;
    descripcion: string;
    precio: string;
    precioOriginal?: string;
    ubicacion: string;
    categoria: string;
    promocion?: {
      tipo: string;
      descuento: string;
      vigencia: string;
    };
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative h-full">
      {/* Main Card */}
      <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#02283b]/10 transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
        
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#02283b]/2 via-transparent to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative p-10 flex flex-col h-full">          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              {/* Category Badge */}
              <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#02283b]/10 to-[#1a4a5c]/15 rounded-full border border-[#02283b]/20 mb-8">
                <span className="text-[#02283b] text-sm font-semibold">
                  {service.categoria}
                </span>
              </div>
            </div>
            
            {/* Logo Circle */}
            <div className="ml-4">
              <div className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#02283b]/10 flex items-center justify-center overflow-hidden group-hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://static.scieluxe.com/files/ciatob/logo_ciatob_peque%C3%B1o.PNG" 
                  alt="CIATOB Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <div className="mb-10 flex-grow">
            <h3 className="text-2xl font-bold text-gray-900 mb-5 leading-tight group-hover:text-[#02283b] transition-colors duration-300">
              {service.titulo}
            </h3>
            
            <p className="text-gray-600 leading-relaxed text-base group-hover:text-gray-700 transition-colors duration-300">
              {service.descripcion}
            </p>
          </div>          {/* Price Section */}
          <div className="mb-8 bg-gradient-to-r from-[#02283b]/5 to-[#1a4a5c]/10 p-4 rounded-2xl border border-[#02283b]/10">
            <div className="flex items-end justify-between">
              <div className="flex items-baseline space-x-3">
                {service.precioOriginal && (
                  <span className="text-gray-400 line-through text-sm font-medium">
                    {service.precioOriginal}
                  </span>
                )}
                <div className="flex items-baseline">
                  <span className="text-base font-bold text-[#02283b] group-hover:text-[#1a4a5c] transition-colors duration-300">
                    {service.precio}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">4.9</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href={`/servicios/${service.slug}`} className="block mt-auto">
            <button className="w-full relative overflow-hidden bg-gradient-to-r from-[#02283b] to-[#1a4a5c] text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#02283b]/25 transition-all duration-300 group-hover:scale-105 transform">
              {/* Button Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a4a5c] to-[#02283b] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-center">
                <span className="mr-2">Ver detalles y reservar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-[#02283b]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-8 left-8 w-20 h-20 bg-gradient-to-tr from-[#1a4a5c]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#02283b] to-[#1a4a5c] opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-sm"></div>
    </div>
  );
}