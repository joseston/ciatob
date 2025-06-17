// src/app/psicologia/page.tsx
'use client';

import React from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import TreatmentSection from '@/components/specialty/treatment-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users } from 'lucide-react';

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
    }  ];

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
    }  ];

  return (
    <main className="min-h-screen">
      
      <HeroSpecialty
        title="Psicología"
        description="Abordamos los aspectos emocionales y conductuales que influyen en la obesidad. Nuestros psicólogos especializados te ayudarán a transformar tu relación con la comida y desarrollar estrategias efectivas para el cambio duradero."
        imagePath="https://static.scieluxe.com/files/ciatob/psicologia_11zon.webp"
        stats={heroStats}
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Psicología?"
        description="Nuestro equipo de psicólogos está especializado en los aspectos emocionales y conductuales que influyen en la obesidad."
        items={infoItems}
      />

      <TreatmentSection specialty="psicología" />

      <FAQSection faqs={faqs} specialty="psicología" />

      <CTASection specialty="psicología" />
    </main>
  );
};

export default PsicologiaPage;