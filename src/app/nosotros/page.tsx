// src/app/nosotros/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  Heart, 
  Locate, 
  ListChecks, 
  Microscope,
  Droplet,
  Leaf,
  Smile,
  Dumbbell
} from 'lucide-react';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

// Hero Stats
const heroStats = [
  {
    icon: Clock,
    value: "10+",
    label: "Años de Experiencia"
  },
  {
    icon: Users,
    value: "+3,000",
    label: "Pacientes Atendidos"
  },
  {
    icon: Award,
    value: "97%",
    label: "Satisfacción"
  }
];

// Valores de la clínica
const valores = [
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos comprometemos a brindar una atención personalizada y de calidad a cada uno de nuestros pacientes."
  },
  {
    icon: Microscope,
    title: "Excelencia Científica",
    description: "Nuestros tratamientos están basados en la evidencia científica más actualizada y rigurosa."
  },
  {
    icon: CheckCircle,
    title: "Integridad",
    description: "Actuamos con honestidad, transparencia y ética en todas nuestras interacciones profesionales."
  },
  {
    icon: Locate,
    title: "Empatía",
    description: "Entendemos la situación única de cada paciente, brindando apoyo y comprensión en cada etapa del proceso."
  },
  {
    icon: ListChecks,
    title: "Innovación",
    description: "Buscamos constantemente nuevas y mejores formas de abordar el tratamiento de la obesidad."
  }
];

// Enfoque integral - especialidades
const especialidades = [
  {
    icon: Droplet,
    title: "Endocrinología",
    description: "Diagnóstico y tratamiento de los desequilibrios hormonales que influyen en el peso y el metabolismo."
  },
  {
    icon: Leaf,
    title: "Nutrición",
    description: "Planes alimentarios personalizados que promueven hábitos saludables y sostenibles."
  },
  {
    icon: Smile,
    title: "Psicología",
    description: "Abordaje de los aspectos emocionales y conductuales relacionados con la alimentación."
  },
  {
    icon: Dumbbell,
    title: "Medicina Deportiva",
    description: "Prescripción de actividad física adaptada a las necesidades y capacidades de cada paciente."
  }
];

// Equipo directivo
const equipoDirectivo = [
  {
    name: "Dr. Helard Manrique",
    role: "Fundador y Director Médico",
    specialty: "Endocrinología",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
    description: "Médico endocrinólogo con más de 15 años de experiencia en el tratamiento de la obesidad y trastornos metabólicos."
  },
  {    name: "Dra. Kenlly Cardoza",
    role: "Directora Clínica",
    specialty: "Endocrinología",
    image: "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
    description: "Especialista en endocrinología con enfoque en salud metabólica y trastornos hormonales."
  },
  {
    name: "Lic. Melany Nito Bellido",
    role: "Coordinadora de Nutrición",
    specialty: "Nutrición",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
    description: "Nutricionista con amplia experiencia en el diseño de planes alimentarios para el manejo de la obesidad."
  }
];

const NosotrosPage = () => {
  return (
    <main className="min-h-screen">      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#46b1b9]/10 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Acerca de{' '}
                <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                  CIATOB
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Somos un equipo multidisciplinario de profesionales de la salud dedicados al diagnóstico, tratamiento y seguimiento integral de la obesidad, con un enfoque personalizado para cada paciente.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-white rounded-lg shadow-lg"
                  >
                    <div className="flex flex-col items-center">
                      <stat.icon className="w-8 h-8 text-[#46b1b9] mb-2" />
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                loader={loaderProp}
                unoptimized
                src="https://static.scieluxe.com/files/logociatov.jpg"
                alt="Equipo CIATOB"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historia y Misión */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestra Historia y Misión
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#46b1b9] to-[#22616a] mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Historia</h3>
              <p className="text-gray-600 mb-6">
                CIATOB nació en 2013 de la visión del Dr. Helard Manrique, quien percibió la necesidad de un enfoque verdaderamente integral para el tratamiento de la obesidad. Desde entonces, hemos crecido hasta convertirnos en un referente en el tratamiento multidisciplinario de esta condición en Lima, Perú.
              </p>
              <p className="text-gray-600 mb-6">
                A lo largo de nuestra trayectoria, hemos ayudado a miles de personas a transformar sus vidas mediante un abordaje que integra los aspectos médicos, nutricionales, psicológicos y de actividad física, adaptados a las necesidades individuales de cada paciente.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Misión y Visión</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-semibold text-[#46b1b9] mb-2">Misión</h4>
                <p className="text-gray-600">
                  Brindar atención médica especializada e integral a personas con obesidad, mediante un equipo multidisciplinario comprometido con la excelencia científica y humana, para mejorar su salud y calidad de vida.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-[#46b1b9] mb-2">Visión</h4>
                <p className="text-gray-600">
                  Ser reconocidos como el centro de referencia en el tratamiento integral de la obesidad en Perú, destacando por nuestro enfoque multidisciplinario, la calidad de nuestra atención y los resultados sostenibles.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fundador Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Fundador
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#46b1b9] to-[#22616a] mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Dr. Helard Manrique</h3>
              <p className="text-gray-600 mb-6">
                El Dr. Helard Manrique es un reconocido médico endocrinólogo especializado en el manejo integral de la obesidad y trastornos metabólicos. Con más de 15 años de experiencia clínica y un sólido background académico, ha dedicado su carrera a comprender y tratar la obesidad desde una perspectiva multidisciplinaria.
              </p>
              <p className="text-gray-600 mb-6">
                Tras formarse en las más prestigiosas instituciones médicas y observar los desafíos que enfrentan las personas con obesidad, fundó CIATOB con la visión de crear un centro especializado que abordara esta condición desde todas sus dimensiones: médica, nutricional, psicológica y de actividad física.
              </p>
              <p className="text-gray-600 mb-6">
                Su enfoque innovador combina la rigurosidad científica con una profunda comprensión de los aspectos humanos de la obesidad, lo que ha permitido desarrollar protocolos de tratamiento personalizados y efectivos que han transformado la vida de miles de pacientes.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-[#46b1b9] mr-2" />
                  <span className="text-gray-800">Especialista en Endocrinología</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-[#46b1b9] mr-2" />
                  <span className="text-gray-800">+3,000 Pacientes Atendidos</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-[#46b1b9] mr-2" />
                  <span className="text-gray-800">15+ Años de Experiencia</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#46b1b9] to-[#22616a] rounded-2xl transform translate-x-4 translate-y-4"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4]">                  <Image
                    loader={loaderProp}
                    unoptimized
                    src="https://static.scieluxe.com/files/helard-manrique.png"
                    alt="Dr. Helard Manrique - Fundador de CIATOB"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#46b1b9] to-[#22616a] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estos principios guían nuestro trabajo diario y definen nuestra relación con cada paciente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={valor.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#46b1b9] to-[#22616a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <valor.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{valor.title}</h3>
                <p className="text-gray-600 text-center">{valor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enfoque Multidisciplinario */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enfoque Multidisciplinario
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#46b1b9] to-[#22616a] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En CIATOB comprendemos que la obesidad es una condición compleja que requiere un abordaje integral. Nuestro enfoque combina diversas especialidades médicas para brindar una atención completa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <svg className="w-full h-auto max-w-md mx-auto" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                {/* Círculo central */}
                <circle cx="200" cy="200" r="60" fill="#46b1b9" />
                <text x="200" y="200" textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight="bold" fontSize="16">PACIENTE</text>
                
                {/* Círculos externos y líneas conectoras */}
                <g>
                  <line x1="200" y1="140" x2="200" y2="80" stroke="#46b1b9" strokeWidth="3" />
                  <circle cx="200" cy="60" r="30" fill="#22616a" />
                  <text x="200" y="60" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">Endocrinología</text>
                </g>
                <g>
                  <line x1="253" y1="173" x2="320" y2="120" stroke="#46b1b9" strokeWidth="3" />
                  <circle cx="340" cy="100" r="30" fill="#22616a" />
                  <text x="340" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">Nutrición</text>
                </g>
                <g>
                  <line x1="253" y1="227" x2="320" y2="280" stroke="#46b1b9" strokeWidth="3" />
                  <circle cx="340" cy="300" r="30" fill="#22616a" />
                  <text x="340" y="300" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">Psicología</text>
                </g>
                <g>
                  <line x1="200" y1="260" x2="200" y2="320" stroke="#46b1b9" strokeWidth="3" />
                  <circle cx="200" cy="340" r="30" fill="#22616a" />
                  <text x="200" y="340" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">Medicina Deportiva</text>
                </g>
                <g>
                  <line x1="147" y1="173" x2="80" y2="120" stroke="#46b1b9" strokeWidth="3" />
                  <circle cx="60" cy="100" r="30" fill="#22616a" />
                  <text x="60" y="100" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="12">Seguimiento</text>
                </g>
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-600 mb-8">
                Nuestra metodología coloca al paciente en el centro de la atención, con un equipo de especialistas que trabajan de manera coordinada para abordar todos los aspectos que influyen en la obesidad:
              </p>

              <div className="space-y-4">
                {especialidades.map((esp, index) => (
                  <motion.div
                    key={esp.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#46b1b9] to-[#22616a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <esp.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{esp.title}</h4>
                      <p className="text-gray-600">{esp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8 p-4 bg-gray-50 border-l-4 border-[#46b1b9] rounded-r-lg"
              >
                Este enfoque integrado nos permite ofrecer soluciones personalizadas que abordan la complejidad de la obesidad, logrando resultados más efectivos y sostenibles.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>      </main>
  );
};

export default NosotrosPage;