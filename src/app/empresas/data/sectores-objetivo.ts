// src/app/empresas/data/sectores-objetivo.ts

export interface SectorObjetivo {
  id: string;
  nombre: string;
  descripcion: string;
  necesidadesEspecificas: string[];
  riesgosComunes: string[];
  solucionCIATOB: string;
  normativasAplicables?: string[];
  casosExito?: string;
  prioridadComercial: 'alta' | 'media' | 'baja';
}

export const sectoresObjetivo: SectorObjetivo[] = [
  {
    id: 'mineria',
    nombre: 'Minería',
    descripcion: 'Empresas mineras que requieren evaluaciones médicas obligatorias y manejo de personal en condiciones extremas de altura y esfuerzo físico.',
    necesidadesEspecificas: [
      'Cumplimiento de normativas de salud ocupacional',
      'Evaluaciones médicas pre-ocupacionales y periódicas',
      'Manejo de personal en altura (>3000 msnm)',
      'Prevención de enfermedades cardiovasculares',
      'Control de síndrome metabólico en altura'
    ],
    riesgosComunes: [
      'Síndrome metabólico agravado por altura',
      'Diabetes tipo 2 no diagnosticada',
      'Hipertensión arterial',
      'Sobrepeso y obesidad',
      'Deshidratación crónica'
    ],
    solucionCIATOB: 'Seminarios especializados + evaluaciones InBody + seguimiento médico para cumplimiento normativo y prevención de riesgos',
    normativasAplicables: [
      'D.S. 024-2016-EM (Reglamento de Seguridad y Salud Ocupacional en Minería)',
      'Resolución Ministerial 312-2011-MINSA',
      'Norma G.050 Seguridad durante la construcción'
    ],
    casosExito: 'Empresa Minera Regional - 250 trabajadores evaluados',
    prioridadComercial: 'alta'
  },
  {
    id: 'construccion',
    nombre: 'Construcción',
    descripcion: 'Empresas constructoras que necesitan evaluar la condición física de trabajadores y cumplir normativas de seguridad laboral.',
    necesidadesEspecificas: [
      'Evaluación de aptitud física para trabajo pesado',
      'Prevención de lesiones laborales',
      'Programas de nutrición para trabajadores físicos',
      'Manejo de turnos y horarios irregulares',
      'Certificaciones médicas para proyectos específicos'
    ],
    riesgosComunes: [
      'Lesiones musculoesqueléticas',
      'Fatiga crónica',
      'Malnutrición por horarios irregulares',
      'Deshidratación',
      'Sobrecarga física'
    ],
    solucionCIATOB: 'Evaluaciones InBody para condición física + seminarios nutricionales + seguimiento médico preventivo',
    normativasAplicables: [
      'Norma G.050 Seguridad durante la construcción',
      'D.S. 005-2012-TR (Reglamento de Seguridad y Salud en el Trabajo)',
      'Resolución Ministerial 375-2008-TR'
    ],
    casosExito: 'Constructora Metropolitana - 120 trabajadores',
    prioridadComercial: 'alta'
  },
  {
    id: 'seguridad-publica',
    nombre: 'Seguridad Pública',
    descripcion: 'Instituciones policiales, militares y de seguridad que requieren personal en óptimas condiciones físicas y mentales.',
    necesidadesEspecificas: [
      'Evaluación de condición física operativa',
      'Manejo de estrés en situaciones de riesgo',
      'Prevención de enfermedades metabólicas',
      'Programas de nutrición para turnos rotativos',
      'Seguimiento médico continuo'
    ],
    riesgosComunes: [
      'Estrés crónico y sus consecuencias metabólicas',
      'Síndrome metabólico',
      'Alteraciones del sueño',
      'Problemas cardiovasculares',
      'Sobrepeso por horarios irregulares'
    ],
    solucionCIATOB: 'Programa integral con evaluación InBody + manejo de estrés + seguimiento endocrinológico',
    casosExito: 'Policía Nacional del Perú - 500+ efectivos evaluados',
    prioridadComercial: 'alta'
  },
  {
    id: 'call-centers',
    nombre: 'Call Centers y BPO',
    descripcion: 'Empresas de servicios con personal en trabajo sedentario, horarios rotativos y alta presión laboral.',
    necesidadesEspecificas: [
      'Manejo de sedentarismo laboral',
      'Programas antiestrés',
      'Alimentación saludable en horarios nocturnos',
      'Pausas activas efectivas',
      'Prevención del síndrome metabólico'
    ],
    riesgosComunes: [
      'Sedentarismo extremo',
      'Síndrome metabólico temprano',
      'Problemas posturales',
      'Estrés laboral crónico',
      'Alteraciones del ritmo circadiano'
    ],
    solucionCIATOB: 'Seminarios sobre metabolismo + evaluaciones InBody + programa nutricional para turnos',
    prioridadComercial: 'media'
  },
  {
    id: 'financiero',
    nombre: 'Sector Financiero',
    descripcion: 'Bancos, financieras y empresas del sector que manejan personal con alto estrés y responsabilidades ejecutivas.',
    necesidadesEspecificas: [
      'Manejo de estrés financiero',
      'Prevención de enfermedades ejecutivas',
      'Programas de bienestar para ejecutivos',
      'Evaluaciones médicas preventivas',
      'Coaching en hábitos saludables'
    ],
    riesgosComunes: [
      'Hipertensión por estrés',
      'Síndrome metabólico',
      'Problemas cardiovasculares prematuros',
      'Trastornos del sueño',
      'Hábitos alimentarios inadecuados'
    ],
    solucionCIATOB: 'Programa ejecutivo con evaluación completa + seguimiento personalizado',
    prioridadComercial: 'media'
  },
  {
    id: 'tecnologia',
    nombre: 'Tecnología',
    descripcion: 'Empresas de software, startups y tecnología con personal joven pero con hábitos sedentarios y horarios intensos.',
    necesidadesEspecificas: [
      'Prevención temprana del síndrome metabólico',
      'Programas para millennials y gen Z',
      'Alimentación consciente',
      'Manejo de horarios intensos',
      'Cultura de bienestar empresarial'
    ],
    riesgosComunes: [
      'Sedentarismo digital',
      'Alimentación irregular',
      'Problemas posturales',
      'Estrés por deadlines',
      'Síndrome metabólico temprano'
    ],
    solucionCIATOB: 'Programa preventivo con tecnología InBody + educación nutricional moderna',
    prioridadComercial: 'media'
  },
  {
    id: 'manufactura',
    nombre: 'Manufactura e Industria',
    descripcion: 'Plantas industriales y manufacturas que requieren personal en buena condición física y cumplimiento de estándares de seguridad.',
    necesidadesEspecificas: [
      'Evaluación de aptitud física industrial',
      'Prevención de accidentes por fatiga',
      'Programas nutricionales para turnos',
      'Manejo de trabajo físico intenso',
      'Cumplimiento de normativas industriales'
    ],
    riesgosComunes: [
      'Fatiga laboral',
      'Lesiones por sobreesfuerzo',
      'Problemas nutricionales por turnos',
      'Exposición a factores de riesgo',
      'Estrés físico acumulativo'
    ],
    solucionCIATOB: 'Evaluación InBody + programa nutricional industrial + seguimiento médico ocupacional',
    prioridadComercial: 'baja'
  }
];

export const getSectorById = (id: string): SectorObjetivo | undefined => {
  return sectoresObjetivo.find(sector => sector.id === id);
};

export const getSectoresPorPrioridad = (prioridad: 'alta' | 'media' | 'baja'): SectorObjetivo[] => {
  return sectoresObjetivo.filter(sector => sector.prioridadComercial === prioridad);
};

export const sectoresPrioritarios = getSectoresPorPrioridad('alta');
