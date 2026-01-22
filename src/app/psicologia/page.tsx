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
      title: "Terapia de Aceptación y Compromiso (ACT)",
      description: "Aprenderás a relacionarte de forma más flexible con tus pensamientos y emociones, sin que estos dirijan tus decisiones. Te acompañamos a elegir acciones alineadas con lo que realmente te importa, incluso cuando el camino se vuelve difícil."
    },
    {
      title: "Atención a Trastornos de la Conducta Alimentaria",
      description: "Realizamos evaluación y diagnóstico psicológico. Cuando es necesario, te conectamos con especialistas en TCA, priorizando siempre una relación más segura y respetuosa con tu cuerpo y la comida."
    },
    {
      title: "Manejo de Ansiedad y Estrés",
      description: "La ansiedad y el estrés son parte de la experiencia humana. Aquí aprenderás a hacerles espacio sin que controlen tu conducta alimentaria, ganando mayor libertad para responder en lugar de reaccionar."
    },
    {
      title: "Apoyo en el Cambio de Hábitos",
      description: "Trabajamos desde motivaciones reales —cuidar tu salud, disfrutar más tu vida, estar presente para quienes amas— para construir hábitos a los que puedas volver incluso en momentos difíciles."
    },
    {
      title: "Autoestima y Relación con el Cuerpo",
      description: "Más que basar tu valor en el peso o la apariencia, te acompañamos a desarrollar una relación más amable y coherente contigo. Tu valor no depende de cómo te ves, sino de quién eres."
    },
    {
      title: "Terapia Individual y Grupal",
      description: "Ofrecemos espacios individuales y grupales. Ambos promueven conexión, aprendizaje y crecimiento en un entorno seguro, sin juicios y acompañado de personas que atraviesan procesos similares."
    },
    {
      title: "Tratamientos Psicológicos Especializados",
      description: "Integramos el tratamiento médico de la obesidad con intervenciones psicológicas basadas en la ciencia del comportamiento contextual."
    }];

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
    }];

  return (
    <main className="min-h-screen">

      <HeroSpecialty
        title="Psicología"
        description="Acompañamos a personas con obesidad a comprender y trabajar los factores emocionales, conductuales y contextuales que influyen en su relación con la comida y el cuerpo, y a desarrollar hábitos sostenibles en el tiempo. Nuestro equipo de psicólogos te ayuda a construir decisiones más conscientes y sostenibles para tu salud, desde la presencia y la compasión —no desde la culpa ni la autoexigencia."
        imagePath="https://static.scieluxe.com/files/ciatob/psicologia_11zon.webp"
        stats={heroStats}
        specialty="psicología"
      />

      <InfoSection
        title="¿Por qué elegir nuestra especialidad en Psicología?"
        description="Entendemos que la obesidad no se trata solo de fuerza de voluntad. Trabajamos los aspectos emocionales, conductuales y contextuales que muchas veces sostienen el malestar, con un enfoque compasivo y basado en evidencia científica."
        items={infoItems}
      />

      <TreatmentSection specialty="psicología" />

      <FAQSection faqs={faqs} specialty="psicología" />

      <CTASection specialty="psicología" />
    </main>
  );
};

export default PsicologiaPage;