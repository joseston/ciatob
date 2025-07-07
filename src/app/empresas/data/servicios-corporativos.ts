// src/app/empresas/data/servicios-corporativos.ts
// src/app/empresas/data/servicios-corporativos.ts
import { ServicioCorporativo, ProcesoStep } from '../types/empresa.types';

export const serviciosCorporativos: ServicioCorporativo[] = [
  {
    id: '1',
    nombre: 'Evaluaciones Médicas Empresariales',
    descripcion: 'Evaluaciones integrales de salud metabólica y hormonal realizadas por endocrinólogos especializados, diseñadas para detectar factores de riesgo y optimizar el rendimiento laboral.',
    especialidad: 'endocrinologia',
    icono: 'Stethoscope',
    duracion: '45 min por colaborador',
    modalidad: 'presencial',
    beneficios: [
      'Detección temprana de diabetes y síndrome metabólico',
      'Evaluación de niveles hormonales que afectan energía y concentración',
      'Recomendaciones médicas personalizadas',
      'Prevención de enfermedades costosas para la empresa',
      'Mejora del rendimiento cognitivo y físico'
    ]
  },
  {
    id: '2',
    nombre: 'Talleres de Alimentación Saludable',
    descripcion: 'Programas educativos prácticos sobre nutrición corporativa, adaptados a los horarios y necesidades específicas del entorno laboral.',
    especialidad: 'nutricion',
    icono: 'Apple',
    duracion: '90 min por taller',
    modalidad: 'hibrida',
    beneficios: [
      'Mejora de la energía y concentración durante el trabajo',
      'Reducción del cansancio post-almuerzo',
      'Optimización del rendimiento cerebral',
      'Estrategias para alimentación en horarios irregulares',
      'Prevención de enfermedades relacionadas con la dieta'
    ]
  },
  {
    id: '3',
    nombre: 'Manejo de Estrés y Bienestar Mental',
    descripcion: 'Sesiones especializadas en técnicas de manejo del estrés laboral, construcción de resiliencia y mejora del clima organizacional.',
    especialidad: 'psicologia',
    icono: 'Brain',
    duracion: '60 min por sesión',
    modalidad: 'hibrida',
    beneficios: [
      'Reducción del burnout y estrés laboral',
      'Mejora en la toma de decisiones bajo presión',
      'Fortalecimiento de relaciones interpersonales',
      'Técnicas de relajación aplicables en el trabajo',
      'Prevención de trastornos de ansiedad y depresión'
    ]
  },
  {
    id: '4',
    nombre: 'Programas de Actividad Física Laboral',
    descripcion: 'Programas de ejercicio diseñados específicamente para el entorno corporativo, incluyendo pausas activas y rutinas adaptadas a espacios de oficina.',
    especialidad: 'ejercicio',
    icono: 'Dumbbell',
    duracion: '30-60 min',
    modalidad: 'presencial',
    beneficios: [
      'Reducción de dolores por posturas prolongadas',
      'Mejora de la circulación y energía',
      'Fortalecimiento del sistema inmunológico',
      'Reducción del ausentismo por lesiones',
      'Mejora del estado de ánimo y motivación'
    ]
  }
];

export const procesoImplementacion: ProcesoStep[] = [
  {
    numero: 1,
    titulo: 'Diagnóstico Empresarial',
    descripcion: 'Evaluamos las necesidades específicas de tu empresa, analizamos el perfil de colaboradores y identificamos las principales áreas de oportunidad.',
    duracion: '1-2 semanas',
    icono: 'Search'
  },
  {
    numero: 2,
    titulo: 'Diseño del Programa',
    descripcion: 'Creamos un programa personalizado que se adapte a tu cultura organizacional, horarios y objetivos específicos de bienestar.',
    duracion: '1 semana',
    icono: 'Settings'
  },
  {
    numero: 3,
    titulo: 'Implementación',
    descripcion: 'Ejecutamos el programa con nuestro equipo multidisciplinario, ya sea en tus instalaciones o de forma virtual según convenga.',
    duracion: 'Según paquete',
    icono: 'Play'
  },
  {
    numero: 4,
    titulo: 'Seguimiento y Resultados',
    descripcion: 'Monitoreamos el progreso, medimos resultados y ajustamos el programa para maximizar el impacto en tu organización.',
    duracion: 'Continuo',
    icono: 'TrendingUp'
  }
];

export const getServicioById = (id: string): ServicioCorporativo | undefined => {
  return serviciosCorporativos.find(servicio => servicio.id === id);
};

export const getServiciosByEspecialidad = (especialidad: 'endocrinologia' | 'nutricion' | 'psicologia' | 'ejercicio'): ServicioCorporativo[] => {
  return serviciosCorporativos.filter(servicio => servicio.especialidad === especialidad);
};