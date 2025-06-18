// src/components/specialty/treatment-section.tsx
'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Activity, Droplet, Microscope, LineChart, Apple, BookOpen, Utensils, Scale, Brain, Heart, Users, Target, Play } from 'lucide-react';

interface Treatment {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TreatmentSectionProps {
  specialty?: string;
}

const TreatmentSection: React.FC<TreatmentSectionProps> = ({ specialty = 'endocrinología' }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Función simple para activar el video
  const handlePlayVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ocultar el overlay inmediatamente
    setShowOverlay(false);
    
    // Simular click directo en el iframe después de que se oculte el overlay
    setTimeout(() => {
      if (iframeRef.current) {
        // Crear evento de click sintético en el iframe
        const iframe = iframeRef.current;
        const rect = iframe.getBoundingClientRect();
        
        // Crear eventos mouse down y up para simular un click completo
        const mouseDownEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        });
        
        const mouseUpEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        });
        
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        });
        
        // Disparar los eventos en secuencia
        iframe.dispatchEvent(mouseDownEvent);
        iframe.dispatchEvent(mouseUpEvent);
        iframe.dispatchEvent(clickEvent);
        
        // También intentar focus en el iframe
        iframe.focus();
      }
    }, 50);
  };

  // Get specialty-specific treatments
  const getSpecialtyTreatments = (specialtyName: string): Treatment[] => {
    switch (specialtyName.toLowerCase()) {
      case 'endocrinología':
        return [
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
      case 'nutrición':
        return [
          {
            icon: Apple,
            title: "Plan Nutricional Personalizado",
            description: "Diseño de planes de alimentación adaptados a tus necesidades específicas, preferencias y estilo de vida."
          },
          {
            icon: BookOpen,
            title: "Educación Alimentaria",
            description: "Enseñanza de principios nutricionales para comprender la relación entre alimentación y salud."
          },
          {
            icon: Utensils,
            title: "Asesoría en Preparación de Alimentos",
            description: "Guía práctica para la preparación de comidas saludables y satisfactorias."
          },
          {
            icon: Scale,
            title: "Control de Peso Saludable",
            description: "Estrategias efectivas para lograr y mantener un peso saludable sin dietas restrictivas."
          }
        ];
      case 'psicología':
        return [
          {
            icon: Brain,
            title: "Terapia Cognitivo-Conductual",
            description: "Modificación de patrones de pensamiento y comportamiento relacionados con la alimentación y el peso."
          },
          {
            icon: Heart,
            title: "Manejo Emocional",
            description: "Desarrollo de herramientas para gestionar emociones sin recurrir a la comida como mecanismo de afrontamiento."
          },
          {
            icon: Users,
            title: "Terapia Grupal",
            description: "Sesiones de apoyo grupal para compartir experiencias y estrategias con personas en situaciones similares."
          },
          {
            icon: Target,
            title: "Establecimiento de Metas",
            description: "Definición de objetivos realistas y desarrollo de estrategias para mantener la motivación a largo plazo."
          }
        ];
      case 'prescripcion del ejercicio':
        return [
          {
            icon: Activity,
            title: "Evaluación Física Integral",
            description: "Análisis completo de capacidad física, composición corporal y condición cardiovascular."
          },
          {
            icon: Target,
            title: "Programas de Ejercicio",
            description: "Diseño de rutinas de entrenamiento personalizadas adaptadas a tu nivel y objetivos específicos."
          },
          {
            icon: Heart,
            title: "Prevención de Lesiones",
            description: "Estrategias para minimizar riesgos de lesión durante el proceso de pérdida de peso y acondicionamiento."
          },
          {
            icon: LineChart,
            title: "Monitoreo de Rendimiento",
            description: "Seguimiento del progreso físico y ajustes del programa según la evolución individual."
          }
        ];
      default:
        return [
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
    }
  };

  const treatments = getSpecialtyTreatments(specialty);

  // Get specialty-specific configuration
  const getSpecialtyConfig = (specialtyName: string) => {
    switch (specialtyName.toLowerCase()) {
      case 'endocrinología':
        return {
          colors: {
            primary: '#02283b',
            secondary: '#1a4a5c',
            gradient: 'from-[#02283b] to-[#1a4a5c]'
          },
          media: {
            type: 'instagram',
            src: 'https://www.instagram.com/p/DHObkvxu5x8/',
            embedId: 'DHObkvxu5x8',
            alt: 'Tratamientos endocrinológicos en CIATOB'
          }
        };
      case 'nutrición':
        return {
          colors: {
            primary: '#d29113',
            secondary: '#b8781a',
            gradient: 'from-[#d29113] to-[#b8781a]'
          },
          media: {
            type: 'instagram',
            src: 'https://www.instagram.com/p/DHVwQuDtGhS/',
            embedId: 'DHVwQuDtGhS',
            alt: 'Tratamientos nutricionales en CIATOB'
          }
        };
      case 'psicología':
        return {
          colors: {
            primary: '#b72955',
            secondary: '#a02348',
            gradient: 'from-[#b72955] to-[#a02348]'
          },
          media: {
            type: 'instagram',
            src: 'https://www.instagram.com/p/DEqP_KWyDKq/',
            embedId: 'DEqP_KWyDKq',
            alt: 'Tratamientos psicológicos en CIATOB'
          }
        };
      case 'prescripcion del ejercicio':
        return {
          colors: {
            primary: '#398e43',
            secondary: '#2d7235',
            gradient: 'from-[#398e43] to-[#2d7235]'
          },
          media: {
            type: 'instagram',
            src: 'https://www.instagram.com/p/DHI4WENNLdU/',
            embedId: 'DHI4WENNLdU',
            alt: 'Tratamientos de prescripción del ejercicio en CIATOB'
          }
        };
      default:
        return {
          colors: {
            primary: '#46b1b9',
            secondary: '#22616a',
            gradient: 'from-[#46b1b9] to-[#22616a]'
          },
          media: {
            type: 'image',
            src: 'https://static.scieluxe.com/files/ciatob/ciatob_general.webp',
            alt: 'Tratamientos especializados en CIATOB'
          }
        };
    }
  };
  
  const config = getSpecialtyConfig(specialty);
  const { colors, media } = config;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tratamientos Especializados en{' '}
              <span className={`bg-gradient-to-r ${colors.gradient} text-transparent bg-clip-text`}>
                {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
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
                    <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
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
            {media.type === 'instagram' ? (
              <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white">
                <iframe
                  ref={iframeRef}
                  src={`https://www.instagram.com/p/${media.embedId}/embed/`}
                  width="600"
                  height="750"
                  frameBorder="0"
                  scrolling="no"
                  className="w-full rounded-2xl"
                  title={media.alt}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                
                {/* Video Play Overlay - Solo se muestra si showOverlay es true */}
                {showOverlay && (
                  <div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 cursor-pointer z-20"
                    onClick={handlePlayVideo}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-2xl hover:scale-110 transition-transform duration-200">
                      <Play className="w-16 h-16 text-gray-800 fill-current ml-2" />
                    </div>
                  </div>
                )}

                {/* Video Indicator Badge */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 pointer-events-none z-10">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Video
                </div>

                {/* Instagram Logo Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium pointer-events-none z-10">
                  Instagram
                </div>

                {/* Botón para mostrar overlay nuevamente */}
                {!showOverlay && (
                  <button
                    onClick={() => setShowOverlay(true)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors duration-200 shadow-lg z-10 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Mostrar controles
                  </button>
                )}
              </div>
            ) : (
              <Image
                src={media.src}
                alt={media.alt}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;