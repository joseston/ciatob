// src/app/empresas/data/servicios-corporativos.ts
// src/app/empresas/data/servicios-corporativos.ts
import { ServicioCorporativo, ProcesoStep } from '../types/empresa.types';

export const serviciosCorporativos: ServicioCorporativo[] = [
  {
    id: '1',
    nombre: 'Seminarios de Actualización Médica',
    descripcion: 'Seminarios especializados dirigidos por el Dr. Helard y equipo multidisciplinario para educar y sensibilizar sobre salud metabólica en el entorno laboral.',
    especialidad: 'endocrinologia',
    icono: 'Presentation',
    duracion: '90 min por seminario',
    modalidad: 'hibrida',
    beneficios: [
      'Contenido médico actualizado y científico',
      'Sensibilización sobre riesgos metabólicos',
      'Adaptado a horarios empresariales',
      'Certificados de participación médica',
      'Material educativo digital incluido'
    ]
  },
  {
    id: '2',
    nombre: 'Evaluación con Tecnología InBody',
    descripcion: 'Análisis completo de composición corporal utilizando impedanciometría para identificar riesgos metabólicos y determinar edad biológica vs cronológica.',
    especialidad: 'endocrinologia',
    icono: 'Activity',
    duracion: '15 min por persona',
    modalidad: 'presencial',
    beneficios: [
      'Análisis científico de composición corporal',
      'Detección temprana de riesgos metabólicos',
      'Comparación edad biológica vs cronológica',
      'Reportes individuales detallados',
      'Identificación de candidatos para seguimiento médico'
    ]
  },
  {
    id: '3',
    nombre: 'Consultas Individuales de Seguimiento',
    descripcion: 'Atención médica personalizada en clínica para colaboradores identificados en riesgo durante las evaluaciones grupales empresariales.',
    especialidad: 'endocrinologia',
    icono: 'UserCheck',
    duracion: '45 min por consulta',
    modalidad: 'presencial',
    beneficios: [
      'Atención médica especializada individual',
      'Planes personalizados de tratamiento',
      'Seguimiento continuo de resultados',
      'Conversión natural desde seminarios',
      'Reportes médicos para seguimiento empresarial'
    ]
  },
  {
    id: '4',
    nombre: 'Cumplimiento de Normativas',
    descripcion: 'Programas especializados para empresas de minería y construcción que requieren evaluaciones médicas obligatorias según normativas de salud ocupacional.',
    especialidad: 'endocrinologia',
    icono: 'Shield',
    duracion: 'Según normativa',
    modalidad: 'presencial',
    beneficios: [
      'Cumplimiento 100% de normativas específicas',
      'Certificados médicos oficiales',
      'Documentación completa para auditorías',
      'Coordinación con medicina ocupacional',
      'Reportes regulatorios detallados'
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