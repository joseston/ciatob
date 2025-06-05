// src/app/nutricion/page.tsx
'use client';

import React from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users, Apple, BookOpen, Utensils, Scale } from 'lucide-react';

const NutricionPage = () => {
  // Hero section data
  const heroStats = [
    {
      icon: Stethoscope,
      value: "+800",
      label: "Pacientes Atendidos"
    },
    {
      icon: Award,
      value: "12+",
      label: "Años de Experiencia"
    },
    {
      icon: Users,
      value: "97%",
      label: "Satisfacción"
    }
  ];

  // Info section data
  const infoItems = [
    {
      title: "Planes Personalizados",
      description: "Desarrollamos planes de alimentación adaptados a tu estilo de vida, preferencias y necesidades nutricionales específicas."
    },
    {
      title: "Educación Nutricional",
      description: "Te enseñamos a tomar decisiones informadas sobre tu alimentación para mantener hábitos saludables a largo plazo."
    },
    {
      title: "Monitoreo de Composición Corporal",
      description: "Evaluamos periódicamente tu composición corporal para ajustar tu plan nutricional y maximizar resultados."
    },
    {
      title: "Abordaje de Trastornos Alimenticios",
      description: "Tratamiento especializado para personas con trastornos de la conducta alimentaria y relación problemática con la comida."
    },
    {
      title: "Suplementación Inteligente",
      description: "Recomendaciones personalizadas de suplementos nutricionales cuando son necesarios para optimizar tu salud."
    },
    {
      title: "Coaching Nutricional",
      description: "Acompañamiento continuo para ayudarte a superar obstáculos y mantener tu motivación durante todo el proceso."
    }
  ];

  // Nutrition treatments
  const treatments = [
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

  // FAQ section data
  const faqs = [
    {
      question: "¿Cómo se diferencia su enfoque nutricional de las dietas convencionales?",
      answer: "Nuestro enfoque no se basa en restricciones extremas ni en planes genéricos. Trabajamos con planes personalizados basados en tu metabolismo, preferencias y estilo de vida, buscando crear hábitos sostenibles a largo plazo en lugar de soluciones temporales."
    },
    {
      question: "¿Cuánto tiempo toma ver resultados con la asesoría nutricional?",
      answer: "Los primeros cambios suelen notarse entre 2-4 semanas, pero los resultados más significativos y duraderos se observan después de 3-6 meses de seguimiento consistente. Cada persona avanza a su propio ritmo según factores individuales."
    },
    {
      question: "¿Debo seguir una dieta especial antes de mi primera consulta?",
      answer: "No es necesario. De hecho, recomendamos mantener tus hábitos actuales para poder evaluar adecuadamente tu situación inicial y crear un plan realista basado en tu punto de partida."
    },
    {
      question: "¿Tendré que eliminar completamente ciertos alimentos?",
      answer: "Nuestro enfoque raramente incluye prohibiciones absolutas. Creemos en el equilibrio y la moderación. Trabajaremos para ajustar frecuencias y porciones de alimentos según tus objetivos, pero siempre manteniendo flexibilidad."
    },
    {
      question: "¿Con qué frecuencia debo tener consultas de seguimiento?",
      answer: "Inicialmente recomendamos consultas cada 2-3 semanas para ajustar el plan según tu respuesta y progreso. A medida que avanzas, las consultas pueden espaciarse a mensuales o bimestrales para mantenimiento."
    }
  ];

  // Custom Treatment Section for Nutrition
  const NutritionTreatmentSection = () => {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Servicios Especializados en{' '}
                <span className="bg-gradient-to-r from-[#d29113] to-[#b8781a] text-transparent bg-clip-text">
                  Nutrición
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nuestro equipo de nutricionistas desarrolla planes alimentarios personalizados, educación nutricional y estrategias para transformar tu relación con la comida.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {treatments.map((treatment) => (
                  <div
                    key={treatment.title}
                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#d29113] to-[#b8781a] rounded-lg flex items-center justify-center flex-shrink-0">
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
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <img
                src="https://static.scieluxe.com/files/nutricion.jpg"
                alt="Servicios nutricionales en CIATOB"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen">
      
      <HeroSpecialty
        title="Nutrición"
        description="Transforma tu relación con la comida a través de planes nutricionales personalizados, educación alimentaria y acompañamiento continuo para lograr cambios duraderos en tu salud y bienestar."
        imagePath="https://static.scieluxe.com/files/nutricion.jpg"
        stats={heroStats}
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Nutrición?"
        description="Nuestro equipo de nutricionistas está especializado en crear estrategias alimentarias personalizadas para el manejo efectivo de la obesidad."
        items={infoItems}
      />

      <NutritionTreatmentSection />

      <FAQSection faqs={faqs} />

      <CTASection specialty="nutrición" />
    </main>
  );
};

export default NutricionPage;