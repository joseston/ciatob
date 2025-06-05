// src/app/psicologia/page.tsx
'use client';

import React from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users, Brain, Heart, Lightbulb, Puzzle, CopyCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PsicologiaPage = () => {
  // Hero section data
  const heroStats = [
    {
      icon: Stethoscope,
      value: "+600",
      label: "Pacientes Atendidos"
    },
    {
      icon: Award,
      value: "10+",
      label: "Años de Experiencia"
    },
    {
      icon: Users,
      value: "95%",
      label: "Satisfacción"
    }
  ];

  // Info section data
  const infoItems = [
    {
      title: "Terapia Cognitivo-Conductual",
      description: "Abordaje especializado para modificar patrones de pensamiento y comportamiento relacionados con la alimentación y la imagen corporal."
    },
    {
      title: "Atención a Trastornos Alimentarios",
      description: "Diagnóstico y tratamiento de trastornos de la conducta alimentaria como parte integral del manejo de la obesidad."
    },
    {
      title: "Manejo de Ansiedad y Estrés",
      description: "Técnicas efectivas para reducir la ansiedad y el estrés que frecuentemente conducen a la alimentación emocional."
    },
    {
      title: "Apoyo en Cambio de Hábitos",
      description: "Estrategias psicológicas para facilitar la adopción y mantenimiento de hábitos saludables de forma sostenible."
    },
    {
      title: "Mejora de Autoestima",
      description: "Trabajo terapéutico orientado a fortalecer la autoimagen y la confianza durante el proceso de cambio."
    },
    {
      title: "Terapia Individual y Grupal",
      description: "Opciones de tratamiento adaptadas a tus necesidades personales, incluyendo sesiones individuales y grupos de apoyo."
    }
  ];

  // Psychological treatments
  const treatments = [
    {
      icon: Brain,
      title: "Terapia Cognitivo-Conductual",
      description: "Técnicas especializadas para modificar patrones de pensamiento negativos y comportamientos problemáticos relacionados con la alimentación."
    },
    {
      icon: Heart,
      title: "Manejo de Alimentación Emocional",
      description: "Estrategias para identificar y gestionar las emociones que desencadenan conductas alimentarias no saludables."
    },
    {
      icon: Lightbulb,
      title: "Mindfulness y Alimentación Consciente",
      description: "Prácticas para desarrollar una relación más atenta y consciente con la comida y las señales de hambre y saciedad."
    },
    {
      icon: Puzzle,
      title: "Terapia de Aceptación y Compromiso",
      description: "Enfoque terapéutico para aceptar las dificultades y comprometerse con acciones alineadas con tus valores personales."
    }
  ];

  // FAQ section data
  const faqs = [
    {
      question: "¿Cómo influye la psicología en el tratamiento de la obesidad?",
      answer: "La psicología aborda los factores emocionales, cognitivos y conductuales que influyen en la alimentación y el mantenimiento de la obesidad. Trabaja aspectos como la alimentación emocional, los pensamientos automáticos negativos, la motivación para el cambio y el desarrollo de nuevos hábitos sostenibles."
    },
    {
      question: "¿Cuántas sesiones de terapia psicológica necesitaré?",
      answer: "El número de sesiones varía según cada caso. Generalmente, el proceso comienza con sesiones semanales durante 1-2 meses, pasando gradualmente a sesiones quincenales y mensuales. Un tratamiento completo puede durar entre 4-6 meses, con seguimientos posteriores para mantenimiento."
    },
    {
      question: "¿La terapia psicológica reemplaza el tratamiento nutricional o médico?",
      answer: "No. La terapia psicológica es complementaria y trabaja en coordinación con los demás especialistas. El enfoque multidisciplinario es fundamental, ya que cada especialidad aborda diferentes aspectos del tratamiento integral de la obesidad."
    },
    {
      question: "¿Qué diferencia hay entre un psicólogo especializado en obesidad y uno general?",
      answer: "Un psicólogo especializado en obesidad posee conocimientos específicos sobre los mecanismos psicológicos involucrados en el desarrollo y mantenimiento del sobrepeso, las conductas alimentarias problemáticas, y técnicas terapéuticas específicas para estos casos."
    },
    {
      question: "¿Es normal sentir ansiedad cuando se cambian los hábitos alimentarios?",
      answer: "Sí, es completamente normal. El cambio de hábitos alimentarios puede generar ansiedad, especialmente al inicio. Parte de la terapia psicológica consiste en desarrollar herramientas para manejar esta ansiedad de forma saludable."
    }
  ];

  // Custom Psychology Treatment Section
  const PsychologyTreatmentSection = () => {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Enfoque{' '}
              <span className="bg-gradient-to-r from-[#b72955] to-[#a02348] text-transparent bg-clip-text">
                Psicológico
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Abordamos los aspectos emocionales y conductuales que influyen en la relación con la comida y el peso, proporcionando herramientas para lograr cambios duraderos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-[400px]">
              <Image
                src="https://static.scieluxe.com/files/psicologia.jpg"
                alt="Psicología en CIATOB"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              {treatments.map((treatment, index) => (
                <motion.div
                  key={treatment.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#b72955] to-[#a02348] rounded-lg flex items-center justify-center flex-shrink-0">
                      <treatment.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {treatment.title}
                      </h3>
                      <p className="text-gray-600">
                        {treatment.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-6 bg-gray-50 rounded-xl border border-[#b72955]/20"
          >
            <div className="flex items-start space-x-4">
              <CopyCheck className="w-8 h-8 text-[#b72955] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nuestro Compromiso
                </h3>
                <p className="text-gray-600">
                  En CIATOB, entendemos que cada persona tiene una historia única con su peso y su alimentación. Nuestro equipo de psicólogos especializados te ofrece un espacio seguro, confidencial y libre de juicios donde podrás explorar y transformar tu relación con la comida, tu cuerpo y tus emociones, como parte esencial del tratamiento integral de la obesidad.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen">
      
      <HeroSpecialty
        title="Psicología"
        description="Abordamos los aspectos emocionales y conductuales que influyen en la obesidad. Nuestros psicólogos especializados te ayudarán a transformar tu relación con la comida y desarrollar estrategias efectivas para el cambio duradero."
        imagePath="https://static.scieluxe.com/files/psicologia.jpg"
        stats={heroStats}
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Psicología?"
        description="Nuestro equipo de psicólogos está especializado en los aspectos emocionales y conductuales que influyen en la obesidad."
        items={infoItems}
      />

      <PsychologyTreatmentSection />

      <FAQSection faqs={faqs} />

      <CTASection specialty="psicología" />
    </main>
  );
};

export default PsicologiaPage;