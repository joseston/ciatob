// src/app/especialidades/endocrinologia/page.tsx
'use client';

import React, { useEffect } from 'react';
import HeroSpecialty from '@/components/specialty/hero-specialty';
import InfoSection from '@/components/specialty/info-section';
import TreatmentSection from '@/components/specialty/treatment-section';
import FAQSection from '@/components/specialty/faq-section';
import CTASection from '@/components/specialty/cta-section';
import { Stethoscope, Award, Users } from 'lucide-react';

const EndocrinologiaPage = () => {
  console.log('🚀 ENDOCRINOLOGIA-PAGE: Componente renderizándose');
  console.log('📍 ENDOCRINOLOGIA-PAGE: Iniciando renderizado de la página');
    const heroStats = [
    {
      icon: Stethoscope,
      value: "+1000",
      label: "Pacientes Atendidos"
    },
    {
      icon: Award,
      value: "15+",
      label: "Años de Experiencia"
    },
    {
      icon: Users,
      value: "98%",
      label: "Satisfacción"
    }
  ];

  useEffect(() => {
    console.log('🔄 ENDOCRINOLOGIA-PAGE: useEffect ejecutándose - página montada');
    console.log('📊 ENDOCRINOLOGIA-PAGE: heroStats:', heroStats);
    console.log('📋 ENDOCRINOLOGIA-PAGE: Pasando props a HeroSpecialty:', {
      title: "Endocrinología",
      imagePath: "https://static.scieluxe.com/files/ciatob/psicologia_ciatob2.webp"
    });
  }, []);

  // Info section data
  const infoItems = [
    {
      title: "Evaluación Integral",
      description: "Análisis completo del perfil hormonal y metabólico para identificar las causas subyacentes de la obesidad."
    },
    {
      title: "Tratamiento Personalizado",
      description: "Plan de tratamiento adaptado a tus necesidades específicas y objetivos de salud."
    },
    {
      title: "Seguimiento Continuo",
      description: "Monitoreo regular de tu progreso y ajustes del tratamiento para garantizar resultados óptimos."
    },
    {
      title: "Tecnología Avanzada",
      description: "Utilizamos las últimas tecnologías y métodos diagnósticos para una atención de primera calidad."
    },
    {
      title: "Educación del Paciente",
      description: "Te proporcionamos el conocimiento necesario para entender y manejar tu condición efectivamente."
    },
    {
      title: "Apoyo Multidisciplinario",
      description: "Trabajamos en conjunto con nutricionistas y otros especialistas para un abordaje integral."
    }
  ];

  // FAQ section data
  const faqs = [
    {
      question: "¿Qué papel juegan las hormonas en el control del peso?",
      answer: "Las hormonas son fundamentales en la regulación del metabolismo, el apetito y el almacenamiento de grasa. Desequilibrios hormonales pueden dificultar la pérdida de peso y contribuir a la obesidad."
    },
    {
      question: "¿Cuánto tiempo dura el tratamiento endocrinológico?",
      answer: "La duración del tratamiento varía según cada caso, pero generalmente es un proceso a largo plazo que requiere seguimiento regular para ajustar el tratamiento según sea necesario."
    },
    {
      question: "¿Qué tipos de exámenes se realizan en la evaluación inicial?",
      answer: "Se realizan análisis de sangre completos para evaluar niveles hormonales, metabolismo, función tiroidea, entre otros. También se puede requerir estudios de imagen según el caso."
    },
    {
      question: "¿El tratamiento endocrinológico tiene efectos secundarios?",
      answer: "Los tratamientos son seguros y personalizados para minimizar efectos secundarios. Cualquier ajuste hormonal se realiza de manera gradual y controlada."
    },
    {
      question: "¿Puedo combinar el tratamiento con otros programas de pérdida de peso?",
      answer: "Sí, de hecho, el tratamiento endocrinológico se complementa muy bien con planes nutricionales y de ejercicio supervisado."
    }  ];

  return (
    <main className="min-h-screen">
      <HeroSpecialty
        title="Endocrinología"
        description="Especialistas en el diagnóstico y tratamiento de trastornos hormonales y metabólicos relacionados con la obesidad. Nuestro enfoque personalizado combina la última tecnología con años de experiencia clínica."
        imagePath="https://static.scieluxe.com/files/ciatob/ciatob_endocrinologia.webp"
        stats={heroStats}
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Endocrinología?"
        description="Nuestro equipo de endocrinólogos está comprometido con proporcionar la más alta calidad de atención en el tratamiento de la obesidad."
        items={infoItems}
      />

      <TreatmentSection specialty="endocrinología" />

      <FAQSection faqs={faqs} specialty="endocrinología" />

      <CTASection specialty="endocrinología" />
    </main>
  );
};

export default EndocrinologiaPage;