// src/app/empresas/components/EmpresasHero.tsx
// src/app/empresas/components/EmpresasHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building, Users, TrendingUp, Award, ArrowRight, Phone, MessageCircle } from 'lucide-react';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

const EmpresasHero: React.FC = () => {
  const stats = [
    {
      icon: Building,
      value: "3+",
      label: "Sectores Especializados"
    },
    {
      icon: Users,
      value: "500+",
      label: "Colaboradores Evaluados"
    },
    {
      icon: TrendingUp,
      value: "60%",
      label: "Riesgos Identificados"
    },
    {
      icon: Award,
      value: "S/25",
      label: "Por Colaborador"
    }
  ];

  const scrollToContacto = () => {
    const elemento = document.getElementById('contacto-empresarial');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center bg-gradient-to-br from-[#02283b] via-[#1a4a5c] to-[#02283b] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 mb-6"
            >
              <Building className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Bienestar Corporativo</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Seminarios Médicos{' '}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text">
                + InBody
              </span>{' '}
              para su empresa
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Evaluaciones médicas con tecnología InBody que identifican riesgos metabólicos 
              y motivan a sus colaboradores a buscar atención médica especializada.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={scrollToContacto}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#02283b] rounded-xl font-semibold hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Solicitar propuesta
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <div className="flex gap-3">
                <a
                  href="https://wa.me/+51948213270"
                  className="inline-flex items-center justify-center px-6 py-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
                
                <a
                  href="tel:+51948213270"
                  className="inline-flex items-center justify-center px-6 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold border border-white/30 transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20">
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/20 rounded-3xl"></div>
                
                {/* Logo/Brand */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Image
                      loader={loaderProp}
                      unoptimized
                      src="https://static.scieluxe.com/files/ciatob/logo_ciatob_pequeño.PNG"
                      alt="CIATOB Logo"
                      width={120}
                      height={120}
                      className="mx-auto mb-6 rounded-full bg-white/10 p-4 border border-white/20"
                      priority
                    />
                    <h3 className="text-2xl font-bold mb-2">CIATOB Empresas</h3>
                    <p className="text-white/80">Bienestar Corporativo Integral</p>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 left-8 bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-300" />
                    <div>
                      <div className="text-sm font-semibold">Productividad</div>
                      <div className="text-xs text-white/80">+30%</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 right-8 bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-300" />
                    <div>
                      <div className="text-sm font-semibold">Satisfacción</div>
                      <div className="text-xs text-white/80">95%</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmpresasHero;