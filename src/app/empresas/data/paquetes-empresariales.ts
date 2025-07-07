// src/app/empresas/data/paquetes-empresariales.ts
// src/app/empresas/data/paquetes-empresariales.ts
import { PaqueteEmpresarial } from '../types/empresa.types';

export const paquetesEmpresariales: PaqueteEmpresarial[] = [
  {
    id: '1',
    nombre: 'Paquete Básico',
    descripcion: 'Introducción al bienestar corporativo con charlas informativas y evaluaciones básicas para sensibilizar a los colaboradores.',
    precio: 'Desde S/ 2,500',
    duracion: '1 mes',
    participantes: 'Hasta 50 colaboradores',
    tipo: 'basico',
    servicios: [
      '2 Charlas magistrales sobre alimentación saludable',
      '1 Taller de manejo de estrés laboral',
      'Evaluación básica de IMC y composición corporal',
      'Material educativo digital',
      'Reporte ejecutivo de resultados'
    ]
  },
  {
    id: '2',
    nombre: 'Paquete Integral',
    descripcion: 'Programa completo de bienestar que combina evaluaciones, talleres prácticos y seguimiento personalizado para generar cambios duraderos.',
    precio: 'Desde S/ 7,500',
    duracion: '3 meses',
    participantes: 'Hasta 100 colaboradores',
    tipo: 'integral',
    destacado: true,
    servicios: [
      'Evaluación médica integral por endocrinólogo',
      '4 Talleres nutricionales prácticos',
      '3 Sesiones de bienestar psicológico grupal',
      'Programa de actividad física laboral',
      'Plan de alimentación corporativo',
      'Seguimiento mensual personalizado',
      'App de seguimiento empresarial',
      'Consultas individuales (10 por mes)',
      'Reporte trimestral con métricas'
    ]
  },
  {
    id: '3',
    nombre: 'Paquete Premium',
    descripcion: 'Solución integral anual con atención personalizada, seguimiento continuo y programas adaptativos según las necesidades específicas de la empresa.',
    precio: 'Desde S/ 25,000',
    duracion: '12 meses',
    participantes: 'Más de 100 colaboradores',
    tipo: 'premium',
    servicios: [
      'Diagnóstico empresarial completo',
      'Programa personalizado por área/cargo',
      'Consultas individuales ilimitadas',
      'Evaluaciones médicas trimestrales',
      'Talleres mensuales especializados',
      'Programa de liderazgo saludable',
      'Coaching nutricional y psicológico',
      'Gimnasio/actividades in-company',
      'Dashboard ejecutivo en tiempo real',
      'Consultoría en políticas de bienestar',
      'Soporte 24/7 vía WhatsApp Business',
      'Certificación empresa saludable'
    ]
  }
];

export const getPaqueteById = (id: string): PaqueteEmpresarial | undefined => {
  return paquetesEmpresariales.find(paquete => paquete.id === id);
};

export const getPaquetesByTipo = (tipo: 'basico' | 'integral' | 'premium'): PaqueteEmpresarial[] => {
  return paquetesEmpresariales.filter(paquete => paquete.tipo === tipo);
};