// src/app/medicina-deportiva/page.tsx
'use client';

import React from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import TreatmentSection from '@/components/specialty/treatment-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users } from 'lucide-react';

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
    }  ];

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
    }  ];
  return (
    <main className="min-h-screen">
      <HeroSpecialty
        title="Prescripción del Ejercicio"
        description="Prescripción científica de actividad física como herramienta terapéutica para el manejo de la obesidad. Nuestros especialistas diseñan programas personalizados que consideran tu condición actual y objetivos de salud."
        imagePath="https://static.scieluxe.com/files/ciatob/prescripcion-ejercicio.webp"
        stats={heroStats}
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Prescripción del Ejercicio?"
        description="Nuestro equipo de especialistas en prescripción del ejercicio proporciona programas de ejercicio científicamente diseñados para el manejo de la obesidad."
        items={infoItems}
      />

      <TreatmentSection specialty="prescripcion del ejercicio" />

      <FAQSection faqs={faqs} specialty="prescripcion del ejercicio" />

      <CTASection specialty="prescripcion del ejercicio" />
    </main>
  );
};

export default MedicinaDeportivaPage;