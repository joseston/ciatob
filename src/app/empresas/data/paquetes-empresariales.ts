// src/app/empresas/data/paquetes-empresariales.ts
// src/app/empresas/data/paquetes-empresariales.ts
import { PaqueteEmpresarial } from '../types/empresa.types';

export const paquetesEmpresariales: PaqueteEmpresarial[] = [
  {
    id: '1',
    nombre: 'Seminario + Despistaje',
    descripcion: 'Seminario médico especializado con evaluación InBody para identificar colaboradores en riesgo y motivar consultas individuales.',
    precio: 'S/ 500 (20 personas)',
    duracion: '3 horas',
    participantes: '20 colaboradores',
    tipo: 'basico',
    servicios: [
      'Seminario médico de 90 minutos por especialista',
      'Despistaje de obesidad con tecnología InBody',
      'Evaluación de edad biológica vs cronológica',
      'Identificación de colaboradores en riesgo',
      'Reporte individual de impedanciometría',
      'Recomendaciones para consulta médica'
    ]
  },
  {
    id: '2',
    nombre: 'Programa Empresarial',
    descripcion: 'Seminario médico + despistaje InBody + seguimiento con consultas individuales para colaboradores interesados.',
    precio: 'S/ 25 por persona + consultas',
    duracion: '1-3 meses',
    participantes: 'Hasta 100 colaboradores',
    tipo: 'integral',
    destacado: true,
    servicios: [
      'Seminario de actualización médica',
      'Evaluación completa con InBody',
      'Análisis de composición corporal',
      'Identificación de metabolismo lento',
      'Consultas individuales de seguimiento',
      'Plan nutricional personalizado',
      'Seguimiento psicológico si requerido',
      'Certificados médicos individuales',
      'Reporte ejecutivo de resultados empresariales'
    ]
  },
  {
    id: '3',
    nombre: 'Cumplimiento Normativo',
    descripcion: 'Programa especializado para empresas de minería y construcción que requieren evaluaciones médicas obligatorias por normativa.',
    precio: 'Cotización personalizada',
    duracion: 'Según normativa',
    participantes: 'Personal completo',
    tipo: 'premium',
    servicios: [
      'Seminarios de actualización obligatorios',
      'Evaluaciones médicas normativas',
      'Despistaje ocupacional con InBody',
      'Certificados médicos oficiales',
      'Documentación para auditorías',
      'Seguimiento médico continuo',
      'Consultas individuales incluidas',
      'Reportes regulatorios',
      'Cumplimiento de normativas específicas',
      'Soporte para inspecciones',
      'Coordinación con medicina ocupacional'
    ]
  }
];

export const getPaqueteById = (id: string): PaqueteEmpresarial | undefined => {
  return paquetesEmpresariales.find(paquete => paquete.id === id);
};

export const getPaquetesByTipo = (tipo: 'basico' | 'integral' | 'premium'): PaqueteEmpresarial[] => {
  return paquetesEmpresariales.filter(paquete => paquete.tipo === tipo);
};