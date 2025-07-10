// src/app/empresas/data/seminarios-disponibles.ts

export interface SeminarioDisponible {
  id: string;
  titulo: string;
  especialista: string;
  duracion: string;
  objetivos: string[];
  contenido: string[];
  audiencia: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
}

export const seminariosDisponibles: SeminarioDisponible[] = [
  {
    id: 'diabetes-empresarial',
    titulo: 'Prevención de Diabetes en el Entorno Laboral',
    especialista: 'Dr. Helard Manrique - Endocrinólogo',
    duracion: '90 minutos',
    objetivos: [
      'Identificar factores de riesgo de diabetes tipo 2',
      'Reconocer síntomas tempranos',
      'Implementar estrategias preventivas en el trabajo',
      'Motivar evaluaciones médicas individuales'
    ],
    contenido: [
      'Epidemiología de la diabetes en trabajadores',
      'Factores de riesgo modificables y no modificables',
      'Impacto de horarios laborales en el metabolismo',
      'Estrategias alimentarias durante jornada laboral',
      'Importancia de la evaluación con InBody',
      'Casos reales y testimonios de pacientes'
    ],
    audiencia: 'Personal administrativo, ejecutivos, trabajadores de oficina',
    modalidad: 'hibrida'
  },
  {
    id: 'sindrome-metabolico',
    titulo: 'Síndrome Metabólico: Detección y Prevención',
    especialista: 'Dr. Helard Manrique - Endocrinólogo',
    duracion: '90 minutos',
    objetivos: [
      'Comprender qué es el síndrome metabólico',
      'Identificar sus componentes y riesgos',
      'Conocer estrategias de prevención',
      'Entender la importancia del diagnóstico temprano'
    ],
    contenido: [
      'Definición y criterios diagnósticos',
      'Relación con resistencia a la insulina',
      'Factores de riesgo en el trabajo',
      'Importancia de la composición corporal',
      'Tecnología InBody para detección',
      'Plan de acción personal'
    ],
    audiencia: 'Todo tipo de personal, especialmente +35 años',
    modalidad: 'hibrida'
  },
  {
    id: 'nutricion-laboral',
    titulo: 'Alimentación Inteligente para el Trabajo',
    especialista: 'Nutricionista CIATOB',
    duracion: '90 minutos',
    objetivos: [
      'Optimizar alimentación durante horario laboral',
      'Mejorar energía y concentración',
      'Prevenir cansancio post-almuerzo',
      'Establecer hábitos sostenibles'
    ],
    contenido: [
      'Cronobiología y horarios de comida',
      'Alimentos que mejoran concentración',
      'Estrategias para comedores empresariales',
      'Snacks saludables para oficina',
      'Hidratación adecuada',
      'Meal prep empresarial'
    ],
    audiencia: 'Todo el personal de la empresa',
    modalidad: 'presencial'
  },
  {
    id: 'estres-metabolismo',
    titulo: 'Estrés Laboral y su Impacto en el Metabolismo',
    especialista: 'Psicólogo + Dr. Helard',
    duracion: '90 minutos',
    objetivos: [
      'Entender la relación estrés-metabolismo',
      'Identificar señales de alarma',
      'Aprender técnicas de manejo',
      'Prevenir enfermedades relacionadas'
    ],
    contenido: [
      'Fisiología del estrés y cortisol',
      'Impacto en peso y apetito',
      'Estrés crónico y resistencia insulínica',
      'Técnicas de relajación aplicables',
      'Mindfulness en el trabajo',
      'Cuándo buscar ayuda profesional'
    ],
    audiencia: 'Personal con alta carga de estrés',
    modalidad: 'hibrida'
  },
  {
    id: 'salud-ocupacional',
    titulo: 'Salud Metabólica en Trabajos de Riesgo',
    especialista: 'Dr. Helard + Medicina Ocupacional',
    duracion: '120 minutos',
    objetivos: [
      'Cumplir normativas de salud ocupacional',
      'Identificar riesgos metabólicos específicos',
      'Establecer protocolos de seguimiento',
      'Documentar evaluaciones obligatorias'
    ],
    contenido: [
      'Normativas específicas por sector',
      'Riesgos metabólicos en trabajos físicos',
      'Evaluaciones médicas obligatorias',
      'Uso de tecnología InBody en evaluaciones',
      'Certificaciones médicas requeridas',
      'Protocolos de seguimiento'
    ],
    audiencia: 'Minería, construcción, industria pesada',
    modalidad: 'presencial'
  }
];

export const getSeminarioById = (id: string): SeminarioDisponible | undefined => {
  return seminariosDisponibles.find(seminario => seminario.id === id);
};

export const getSeminariosPorModalidad = (modalidad: 'presencial' | 'virtual' | 'hibrida'): SeminarioDisponible[] => {
  return seminariosDisponibles.filter(seminario => seminario.modalidad === modalidad);
};
