// src/app/nutricion/page.tsx
'use client';

import React from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import TreatmentSection from '@/components/specialty/treatment-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users } from 'lucide-react';

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
    }  ];

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
      answer: "Inicialmente recomendamos consultas cada 2-3 semanas para ajustar el plan según tu respuesta y progreso. A medida que avanzas, las consultas pueden espaciarse a mensuales o bimestrales para mantenimiento."    }
  ];

  return (
    <main className="min-h-screen">
      
      <HeroSpecialty
        title="Nutrición"
        description="Transforma tu relación con la comida a través de planes nutricionales personalizados, educación alimentaria y acompañamiento continuo para lograr cambios duraderos en tu salud y bienestar."
        imagePath="https://static.scieluxe.com/files/ciatob/nutricion_11zon.webp"
        stats={heroStats}
      />      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Nutrición?"
        description="Nuestro equipo de nutricionistas está especializado en crear estrategias alimentarias personalizadas para el manejo efectivo de la obesidad."
        items={infoItems}
      />

      <TreatmentSection specialty="nutrición" />

      <FAQSection faqs={faqs} specialty="nutrición" />

      <CTASection specialty="nutrición" />
    </main>
  );
};

export default NutricionPage;