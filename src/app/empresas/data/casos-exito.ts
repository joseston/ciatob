// src/app/empresas/data/casos-exito.ts
// src/app/empresas/data/casos-exito.ts
import { CasoExito } from '../types/empresa.types';

export const casosExito: CasoExito[] = [
  {
    id: '1',
    empresaNombre: 'Policía Nacional del Perú',
    sector: 'Seguridad Pública',
    empleados: 500,
    problema: 'Necesidad de evaluación médica integral del personal policial para identificar riesgos metabólicos y mejorar la condición física operativa del personal en servicio.',
    solucion: 'Seminarios médicos especializados con el Dr. Helard + evaluaciones completas con tecnología InBody para análisis de composición corporal y detección temprana de riesgos.',
    resultados: [
      'Evaluación exitosa de 500+ efectivos policiales',
      'Identificación del 60% del personal con riesgo metabólico',
      'Derivación efectiva a consultas individuales',
      'Mejora en índices de condición física operativa'
    ],
    testimonial: {
      nombre: 'Comandante de Recursos Humanos',
      cargo: 'Jefe de Bienestar del Personal',
      comentario: 'La evaluación con InBody nos permitió identificar riesgos que no detectábamos con métodos tradicionales. El enfoque científico del Dr. Helard transformó nuestra perspectiva sobre la salud del personal policial.'
    },
    metricas: {
      ausentismo: '-25%',
      satisfaccion: '92%',
      productividad: '+30%'
    }
  },
  {
    id: '2',
    empresaNombre: 'Empresa Minera Regional',
    sector: 'Minería',
    empleados: 250,
    problema: 'Cumplimiento de normativas de salud ocupacional y reducción de ausentismo por enfermedades metabólicas en trabajadores de altura y condiciones extremas.',
    solucion: 'Programa de seminarios de actualización médica + evaluaciones InBody + seguimiento individualizado para trabajadores identificados en riesgo metabólico.',
    resultados: [
      'Cumplimiento 100% de normativas de salud',
      'Reducción del 30% en ausentismo por diabetes',
      'Identificación temprana de síndrome metabólico',
      'Certificaciones médicas oficiales'
    ],
    testimonial: {
      nombre: 'Ing. Roberto Vásquez',
      cargo: 'Jefe de Seguridad y Salud Ocupacional',
      comentario: 'CIATOB no solo nos ayudó a cumplir normativas, sino que realmente mejoró la salud de nuestros trabajadores. La tecnología InBody es impresionante para detectar riesgos que otros métodos no pueden.'
    },
    metricas: {
      ausentismo: '-30%',
      satisfaccion: '89%',
      productividad: '+20%'
    }
  },
  {
    id: '3',
    empresaNombre: 'Constructora Metropolitana',
    sector: 'Construcción',
    empleados: 120,
    problema: 'Personal de construcción con horarios demandantes, alto estrés físico y alimentación inadecuada que afectaba el rendimiento y aumentaba riesgos de accidentes.',
    solucion: 'Seminarios adaptados a horarios de construcción + evaluaciones InBody portátiles + plan nutricional específico para trabajadores de construcción.',
    resultados: [
      'Mejora del 40% en indicadores de salud',
      'Reducción significativa en lesiones laborales',
      'Mayor conciencia sobre alimentación saludable',
      'Programa modelo replicable para otras obras'
    ],
    testimonial: {
      nombre: 'Arq. Patricia Morales',
      cargo: 'Gerente de Operaciones',
      comentario: 'Pensamos que los trabajadores de construcción no se interesarían en temas de salud, pero la respuesta fue increíble. El Dr. Helard supo adaptar el mensaje a nuestro personal de manera muy efectiva.'
    },
    metricas: {
      ausentismo: '-35%',
      satisfaccion: '87%',
      productividad: '+25%'
    }
  }
];

export const getCasoById = (id: string): CasoExito | undefined => {
  return casosExito.find(caso => caso.id === id);
};

export const getCasosBySector = (sector: string): CasoExito[] => {
  return casosExito.filter(caso => caso.sector.toLowerCase() === sector.toLowerCase());
};