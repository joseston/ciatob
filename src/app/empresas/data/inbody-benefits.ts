// src/app/empresas/data/inbody-benefits.ts

export interface InBodyBenefit {
  id: string;
  titulo: string;
  descripcion: string;
  aplicacionEmpresarial: string;
  metricas: string[];
  icono: string;
}

export const inBodyBenefits: InBodyBenefit[] = [
  {
    id: 'composicion-corporal',
    titulo: 'Análisis de Composición Corporal',
    descripcion: 'Medición precisa de masa muscular, grasa corporal, agua corporal y masa ósea usando tecnología de impedanciometría.',
    aplicacionEmpresarial: 'Identifica colaboradores con sarcopenia o exceso de grasa visceral que pueden afectar el rendimiento laboral',
    metricas: ['% Grasa corporal', 'Masa muscular', 'Agua corporal total', 'Masa ósea'],
    icono: 'BarChart'
  },
  {
    id: 'edad-biologica',
    titulo: 'Edad Biológica vs Cronológica',
    descripcion: 'Comparación entre la edad real y la edad que refleja el estado físico del cuerpo basado en composición corporal.',
    aplicacionEmpresarial: 'Evalúa el impacto del estrés laboral en el envejecimiento prematuro y identifica necesidades de intervención',
    metricas: ['Edad biológica', 'Diferencia con edad cronológica', 'Velocidad de envejecimiento'],
    icono: 'Calendar'
  },
  {
    id: 'riesgo-metabolico',
    titulo: 'Evaluación de Riesgo Metabólico',
    descripcion: 'Análisis de la distribución de grasa corporal para identificar riesgos de diabetes, hipertensión y síndrome metabólico.',
    aplicacionEmpresarial: 'Detección temprana de colaboradores en riesgo que podrían generar costos médicos altos para la empresa',
    metricas: ['Grasa visceral', 'Ratio cintura-cadera', 'Distribución de grasa segmentaria'],
    icono: 'Heart'
  },
  {
    id: 'balance-hidrico',
    titulo: 'Balance Hídrico Corporal',
    descripcion: 'Medición del agua intracelular y extracelular para evaluar el estado de hidratación y función celular.',
    aplicacionEmpresarial: 'Identifica problemas de hidratación que afectan la concentración y productividad laboral',
    metricas: ['Agua total', 'Agua intracelular', 'Agua extracelular', 'Ratio ICW/ECW'],
    icono: 'Droplets'
  },
  {
    id: 'musculo-esqueletico',
    titulo: 'Análisis Músculo-Esquelético',
    descripcion: 'Evaluación segmentaria de masa muscular en brazos, piernas y tronco para detectar desequilibrios y debilidades.',
    aplicacionEmpresarial: 'Previene lesiones laborales identificando debilidades musculares y desequilibrios posturales',
    metricas: ['Masa muscular segmentaria', 'Desarrollo muscular', 'Balance muscular'],
    icono: 'Activity'
  },
  {
    id: 'progreso-objetivo',
    titulo: 'Seguimiento de Progreso',
    descripcion: 'Monitoreo de cambios en composición corporal a lo largo del tiempo para evaluar efectividad de intervenciones.',
    aplicacionEmpresarial: 'Permite medir el ROI de programas de bienestar y justificar inversiones en salud corporativa',
    metricas: ['Tendencias temporales', 'Cambios en composición', 'Efectividad de intervenciones'],
    icono: 'TrendingUp'
  }
];

export const ventajasInBodyEmpresarial = [
  {
    titulo: 'Precisión Científica',
    descripcion: 'Tecnología médica validada científicamente, utilizada en hospitales y clínicas especializadas',
    beneficio: 'Resultados confiables que respaldan decisiones médicas'
  },
  {
    titulo: 'Evaluación Rápida',
    descripcion: 'Análisis completo en solo 15 minutos por persona, sin necesidad de cambio de ropa',
    beneficio: 'Mínima interrupción de actividades laborales'
  },
  {
    titulo: 'Reportes Detallados',
    descripcion: 'Informes individuales comprensibles con gráficos y recomendaciones específicas',
    beneficio: 'Información clara para empleados y reportes ejecutivos para la empresa'
  },
  {
    titulo: 'Detección Temprana',
    descripcion: 'Identifica riesgos metabólicos antes de que se conviertan en enfermedades',
    beneficio: 'Prevención de costos médicos altos y ausentismo laboral'
  },
  {
    titulo: 'Motivación Personal',
    descripcion: 'Datos objetivos que motivan cambios de comportamiento y búsqueda de atención médica',
    beneficio: 'Mayor participación en programas de bienestar y consultas médicas'
  }
];

export const diferenciadorInBody = {
  titulo: 'Diferenciador Tecnológico CIATOB',
  descripcion: 'Somos la única clínica en Lima que integra tecnología InBody con expertise médico especializado para evaluaciones empresariales',
  ventajas: [
    'Equipo InBody profesional (no versión doméstica)',
    'Interpretación médica especializada por endocrinólogo',
    'Integración con evaluación clínica completa',
    'Seguimiento médico post-evaluación',
    'Reportes adaptados a necesidades empresariales'
  ]
};
