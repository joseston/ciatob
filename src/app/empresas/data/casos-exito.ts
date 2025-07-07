// src/app/empresas/data/casos-exito.ts
// src/app/empresas/data/casos-exito.ts
import { CasoExito } from '../types/empresa.types';

export const casosExito: CasoExito[] = [
  {
    id: '1',
    empresaNombre: 'TechCorp Solutions',
    sector: 'Tecnología',
    empleados: 150,
    problema: 'Alto nivel de estrés, sedentarismo y alimentación inadecuada en horarios de trabajo extensos, resultando en un 25% de ausentismo por temas de salud.',
    solucion: 'Implementación del Paquete Integral con enfoque en manejo de estrés, talleres de alimentación saludable durante horarios laborales y programa de pausas activas.',
    resultados: [
      'Reducción del ausentismo en 40%',
      'Mejora del 85% en satisfacción laboral',
      'Incremento del 30% en productividad',
      '90% de participación en programas'
    ],
    testimonial: {
      nombre: 'María González',
      cargo: 'Gerente de Recursos Humanos',
      comentario: 'El programa de CIATOB transformó completamente el ambiente laboral. Nuestros colaboradores están más motivados, saludables y productivos. La inversión se vio reflejada inmediatamente en los indicadores de la empresa.'
    },
    metricas: {
      ausentismo: '-40%',
      satisfaccion: '85%',
      productividad: '+30%'
    }
  },
  {
    id: '2',
    empresaNombre: 'Banco Nacional',
    sector: 'Financiero',
    empleados: 300,
    problema: 'Personal con altos niveles de ansiedad y problemas alimentarios debido a la presión laboral y horarios irregulares, afectando el rendimiento y clima organizacional.',
    solucion: 'Paquete Premium con consultas psicológicas especializadas, programa nutricional adaptado a horarios bancarios y evaluaciones médicas preventivas.',
    resultados: [
      'Disminución del 50% en licencias médicas',
      'Mejora del 75% en clima organizacional',
      'Reducción del 35% en rotación de personal',
      '95% de satisfacción con el programa'
    ],
    testimonial: {
      nombre: 'Carlos Mendoza',
      cargo: 'Director de Talento Humano',
      comentario: 'CIATOB nos ayudó a abordar problemas de salud que no sabíamos cómo manejar. Su enfoque integral y profesional generó un cambio cultural positivo en toda la organización.'
    },
    metricas: {
      ausentismo: '-50%',
      satisfaccion: '75%',
      productividad: '+25%'
    }
  },
  {
    id: '3',
    empresaNombre: 'Grupo Manufactura',
    sector: 'Industrial',
    empleados: 200,
    problema: 'Trabajadores con problemas de sobrepeso y fatiga que afectaban la seguridad laboral y eficiencia operativa.',
    solucion: 'Programa Integral enfocado en nutrición industrial, actividad física adaptada a turnos rotativos y seguimiento médico especializado.',
    resultados: [
      'Reducción del 60% en accidentes laborales',
      'Mejora del 45% en eficiencia operativa',
      'Pérdida promedio de 8kg por participante',
      '88% de adherencia al programa'
    ],
    testimonial: {
      nombre: 'Ana Torres',
      cargo: 'Jefe de Seguridad Industrial',
      comentario: 'Los resultados superaron nuestras expectativas. No solo mejoramos la salud de nuestros trabajadores, sino que también aumentamos significativamente la seguridad y productividad en planta.'
    },
    metricas: {
      ausentismo: '-35%',
      satisfaccion: '88%',
      productividad: '+45%'
    }
  }
];

export const getCasoById = (id: string): CasoExito | undefined => {
  return casosExito.find(caso => caso.id === id);
};

export const getCasosBySector = (sector: string): CasoExito[] => {
  return casosExito.filter(caso => caso.sector.toLowerCase() === sector.toLowerCase());
};