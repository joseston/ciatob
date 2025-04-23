// src/app/medicina-deportiva/page.tsx
'use client';

import React from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users, Dumbbell, HeartPulse, Timer, Target, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const MedicinaDeportivaPage = () => {
  // Hero section data
  const heroStats = [
    {
      icon: Stethoscope,
      value: "+500",
      label: "Pacientes Atendidos"
    },
    {
      icon: Award,
      value: "8+",
      label: "Años de Experiencia"
    },
    {
      icon: Users,
      value: "96%",
      label: "Satisfacción"
    }
  ];

  // Info section data
  const infoItems = [
    {
      title: "Prescripción Personalizada de Ejercicio",
      description: "Programas de actividad física diseñados específicamente para tu condición de salud, capacidades y objetivos."
    },
    {
      title: "Evaluación Funcional Completa",
      description: "Análisis detallado de tu condición física, capacidad cardiorrespiratoria y composición corporal."
    },
    {
      title: "Monitoreo de Progresión",
      description: "Seguimiento y ajuste constante de tu programa de ejercicios para optimizar resultados y prevenir lesiones."
    },
    {
      title: "Rehabilitación Especializada",
      description: "Tratamiento de lesiones y limitaciones funcionales que puedan interferir con tu programa de actividad física."
    },
    {
      title: "Integración con Nutrición",
      description: "Coordinación con el equipo de nutrición para sincronizar la alimentación con tu nivel de actividad física."
    },
    {
      title: "Educación en Actividad Física",
      description: "Enseñanza de técnicas correctas de ejercicio y principios fundamentales para mantener una vida activa."
    }
  ];

  // Sports Medicine treatments
  const treatments = [
    {
      icon: Dumbbell,
      title: "Prescripción de Ejercicio Terapéutico",
      description: "Programas de actividad física diseñados científicamente para mejorar la salud metabólica y facilitar la pérdida de peso."
    },
    {
      icon: HeartPulse,
      title: "Evaluación de Capacidad Física",
      description: "Tests especializados para determinar tu condición cardiovascular, fuerza y resistencia actuales."
    },
    {
      icon: Timer,
      title: "Entrenamiento por Intervalos",
      description: "Protocolos de ejercicio altamente efectivos para optimizar el gasto calórico y la salud metabólica."
    },
    {
      icon: Target,
      title: "Planificación de Progresión",
      description: "Diseño de objetivos incrementales para asegurar una mejora constante y segura en tu condición física."
    }
  ];

  // FAQ section data
  const faqs = [
    {
      question: "¿Es seguro hacer ejercicio si tengo obesidad o sobrepeso significativo?",
      answer: "Sí, es seguro y muy beneficioso, siempre que el ejercicio esté correctamente prescrito y supervisado. Nuestros especialistas diseñan programas considerando tu condición actual, articulaciones, capacidad cardiovascular y otras limitaciones para garantizar un ejercicio seguro y efectivo."
    },
    {
      question: "¿Qué tipo de ejercicio es más efectivo para perder peso?",
      answer: "El ejercicio más efectivo es aquel que puedes mantener consistentemente. Científicamente, una combinación de entrenamiento de fuerza y ejercicio cardiovascular ofrece los mejores resultados para la pérdida de peso y la salud metabólica. Tu programa será personalizado según tus preferencias y necesidades."
    },
    {
      question: "¿Cuánto ejercicio debo hacer para ver resultados?",
      answer: "Las recomendaciones generales son 150-300 minutos semanales de actividad moderada, distribuidos en 4-5 días. Sin embargo, comenzamos donde estés actualmente, incrementando gradualmente la duración e intensidad. Los resultados se ven típicamente después de 6-8 semanas de consistencia."
    },
    {
      question: "¿Necesito equipamiento especial o gimnasio para seguir el programa?",
      answer: "No necesariamente. Diseñamos programas adaptados a los recursos que tengas disponibles. Muchos ejercicios efectivos pueden realizarse con el peso corporal o implementos simples en casa. Lo importante es la técnica correcta y la progresión adecuada."
    },
    {
      question: "¿Puedo hacer ejercicio si tengo problemas articulares o limitaciones físicas?",
      answer: "Absolutamente. Especialmente en estos casos, la prescripción médica del ejercicio es crucial. Adaptamos los movimientos, intensidades y tipos de ejercicio para proteger tus articulaciones mientras mejoras tu condición física y metabolismo."
    }
  ];

  // Custom Sports Medicine Treatment Section
  const SportsMedicineTreatmentSection = () => {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios de{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                Medicina Deportiva
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              La actividad física prescrita médicamente es una herramienta terapéutica poderosa en el manejo de la obesidad. Nuestro enfoque científico garantiza programas seguros y efectivos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <div className="grid grid-cols-1 gap-6">
                {treatments.map((treatment, index) => (
                  <motion.div
                    key={treatment.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#46b1b9] to-[#22616a] rounded-lg flex items-center justify-center flex-shrink-0">
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
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <BarChart className="w-8 h-8 text-[#46b1b9] flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Nuestro Proceso
                    </h3>
                    <ol className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="font-bold mr-2">1.</span> 
                        <span>Evaluación inicial completa de tu condición física y metabólica</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-2">2.</span> 
                        <span>Diseño personalizado de tu programa de ejercicio</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-2">3.</span> 
                        <span>Educación sobre técnicas y principios del ejercicio</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-2">4.</span> 
                        <span>Monitoreo regular para ajustar y progresar tu programa</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold mr-2">5.</span> 
                        <span>Coordinación con el resto del equipo multidisciplinario</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative overflow-hidden rounded-xl shadow-xl h-[250px]"
              >
                <img
                  src="https://static.scieluxe.com/files/medicina-deportiva.jpg"
                  alt="Medicina Deportiva en CIATOB"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <main className="min-h-screen">
      
      <HeroSpecialty
        title="Medicina Deportiva"
        description="Prescripción científica de actividad física como herramienta terapéutica para el manejo de la obesidad. Nuestros especialistas diseñan programas personalizados que consideran tu condición actual y objetivos de salud."
        imagePath="https://static.scieluxe.com/files/medicina-deportiva.jpg"
        stats={heroStats}
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Medicina Deportiva?"
        description="Nuestro equipo de especialistas en medicina deportiva proporciona programas de ejercicio científicamente diseñados para el manejo de la obesidad."
        items={infoItems}
      />

      <SportsMedicineTreatmentSection />

      <FAQSection faqs={faqs} />

      <CTASection />
    </main>
  );
};

export default MedicinaDeportivaPage;