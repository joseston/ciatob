// lib/services/services-data.ts
import { ServiceCardProps, ServiceDetails } from '../types/services';
import { Clock, Users, Award } from 'lucide-react';

/**
 * Datos mock de servicios para la aplicación
 */
export const servicesData: ServiceCardProps[] = [
  {
    id: '1',
    slug: 'evaluacion-composicion-corporal-consulta',
    title: 'Evaluación de Composición Corporal con balanza de bioimpedancia + Consulta Nutricional',
    description: 'Análisis completo de tu composición corporal con tecnología avanzada y asesoría nutricional personalizada para optimizar tu salud.',
    price: 80,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/logociatov.jpg',
    category: 'Nutrición'
  },
  {
    id: '2',
    slug: 'consulta-endocrinologia',
    title: 'Consulta Endocrinología',
    description: 'Evaluación médica especializada en trastornos hormonales y metabólicos relacionados con la obesidad y sobrepeso.',
    price: 120,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/logociatov.jpg',
    category: 'Endocrinología'
  },
  {
    id: '3',
    slug: 'terapia-psicologica-individual',
    title: 'Terapia Psicológica Individual',
    description: 'Sesión terapéutica enfocada en aspectos emocionales y conductuales relacionados con alimentación, imagen corporal y motivación.',
    price: 100,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/logociatov.jpg',
    category: 'Psicología'
  },
  {
    id: '4',
    slug: 'plan-entrenamiento-personalizado',
    title: 'Plan de Entrenamiento Personalizado',
    description: 'Diseño de rutina de ejercicios adaptada a tu condición física, objetivos de salud y preferencias para maximizar resultados.',
    price: 150,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/logociatov.jpg',
    category: 'Medicina Deportiva'
  },
  {
    id: '5',
    slug: 'paquete-control-peso-integral',
    title: 'Paquete Control de Peso Integral',
    description: 'Programa multidisciplinario que incluye consultas en todas las especialidades y seguimiento por 3 meses.',
    price: 500,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/logociatov.jpg',
    category: 'Paquetes'
  },
  {
    id: '6',
    slug: 'consulta-nutricion',
    title: 'Consulta Nutrición',
    description: 'Evaluación nutricional y diseño de plan alimentario personalizado según tus necesidades y objetivos de salud.',
    price: 90,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/logociatov.jpg',
    category: 'Nutrición'
  }
];

/**
 * Datos detallados de los servicios
 */
export const servicesDetailsData: ServiceDetails[] = [
  {
    id: '1',
    slug: 'evaluacion-composicion-corporal-consulta',
    title: 'Evaluación de Composición Corporal con balanza de bioimpedancia + Consulta Nutricional',
    description: 'Análisis completo de tu composición corporal con tecnología avanzada y asesoría nutricional personalizada para optimizar tu salud.',
    longDescription: 'Este servicio combina una evaluación precisa y detallada de tu composición corporal utilizando tecnología de bioimpedancia avanzada con una consulta nutricional personalizada. Durante la evaluación, mediremos con precisión tus niveles de masa muscular, grasa corporal (total y segmentaria), agua corporal, metabolismo basal y otros indicadores clave para entender tu estado de salud actual. Posteriormente, un nutricionista especializado analizará tus resultados y diseñará recomendaciones nutricionales específicas para tus necesidades y objetivos.',
    price: 80,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/nutricion.jpg',
    category: 'Nutrición',
    features: [
      {
        icon: Clock,
        label: "Duración",
        value: "60 min"
      },
      {
        icon: Users,
        label: "Pacientes Atendidos",
        value: "+500"
      },
      {
        icon: Award,
        label: "Satisfacción",
        value: "98%"
      }
    ],
    sections: [
      {
        title: "¿En qué consiste el servicio?",
        text: "La evaluación de composición corporal con bioimpedancia es un método no invasivo que utiliza corrientes eléctricas de baja intensidad para medir diferentes componentes del cuerpo. Este análisis proporciona información detallada sobre tu composición corporal, incluyendo porcentaje de grasa, masa muscular, agua corporal y metabolismo basal.\n\nDespués de la evaluación, un nutricionista especializado interpretará tus resultados y te proporcionará recomendaciones personalizadas. La consulta incluye una revisión de tus hábitos alimentarios actuales, preferencias y objetivos de salud para diseñar un plan nutricional adaptado específicamente a ti."
      },
      {
        title: "¿Por qué es importante?",
        text: "Conocer tu composición corporal va mucho más allá de lo que puede indicar una báscula tradicional o el IMC. Esta evaluación permite identificar con precisión la distribución de grasa en tu cuerpo, tu porcentaje de masa muscular y otros indicadores clave que son fundamentales para diseñar estrategias efectivas de nutrición y actividad física.\n\nEsta información es especialmente valiosa para personas que buscan mejorar su salud metabólica, perder grasa, aumentar masa muscular, o simplemente mantener un seguimiento objetivo de su progreso en términos de salud."
      },
      {
        title: "¿Cómo prepararse?",
        text: "Para obtener resultados más precisos, recomendamos:\n\n- Evitar comidas pesadas 3-4 horas antes de la prueba\n- Estar bien hidratado (pero evitar exceso de líquidos justo antes)\n- No realizar ejercicio intenso en las 12 horas previas\n- No consumir alcohol 24 horas antes\n- Acudir con ropa ligera y cómoda\n- Informar al especialista sobre condiciones médicas o implantes metálicos"
      }
    ],
    benefits: [
      { text: "Medición precisa de tu composición corporal (grasa, músculo, agua)" },
      { text: "Evaluación de la distribución de grasa corporal por segmentos" },
      { text: "Cálculo personalizado de tu tasa metabólica basal" },
      { text: "Plan nutricional adaptado a tus resultados y objetivos" },
      { text: "Recomendaciones específicas para mejorar indicadores alterados" },
      { text: "Establecimiento de metas realistas basadas en datos objetivos" }
    ],
    pricingOptions: [
      {
        id: "basic",
        title: "Sesión Única",
        price: 80,
        features: [
          "Evaluación completa con bioimpedancia",
          "Consulta nutricional (60 min)",
          "Informe detallado de resultados",
          "Recomendaciones nutricionales personalizadas"
        ]
      },
      {
        id: "follow",
        title: "Paquete Seguimiento",
        price: 220,
        discountedPrice: 180,
        features: [
          "Evaluación inicial completa",
          "2 evaluaciones de seguimiento (a los 30 y 60 días)",
          "3 consultas nutricionales",
          "Ajustes de plan según progreso",
          "Informe comparativo de resultados"
        ],
        isPopular: true
      },
      {
        id: "premium",
        title: "Plan Premium",
        price: 350,
        discountedPrice: 290,
        features: [
          "4 evaluaciones (inicial + 3 seguimientos)",
          "4 consultas nutricionales",
          "Plan nutricional detallado",
          "Acceso a nutricionista vía WhatsApp",
          "Seguimiento por 3 meses"
        ]
      }
    ]
  },
  // Aquí irían los detalles de los otros servicios siguiendo la misma estructura
  {
    id: '2',
    slug: 'consulta-endocrinologia',
    title: 'Consulta Endocrinología',
    description: 'Evaluación médica especializada en trastornos hormonales y metabólicos relacionados con la obesidad y sobrepeso.',
    longDescription: 'La consulta de endocrinología está enfocada en la evaluación de trastornos hormonales y metabólicos que pueden estar relacionados con problemas de peso. Nuestros endocrinólogos especializados realizarán una historia clínica detallada, revisión de exámenes previos y evaluación física completa para identificar posibles desequilibrios hormonales que puedan estar afectando tu metabolismo y contribuyendo a problemas de peso.',
    price: 120,
    currency: 'S/',
    imageUrl: 'https://static.scieluxe.com/files/endocrinologia.jpg',
    category: 'Endocrinología',
    features: [
      {
        icon: Clock,
        label: "Duración",
        value: "45 min"
      },
      {
        icon: Users,
        label: "Pacientes Atendidos",
        value: "+1000"
      },
      {
        icon: Award,
        label: "Experiencia",
        value: "15+ años"
      }
    ],
    sections: [
      {
        title: "¿En qué consiste la consulta?",
        text: "La consulta de endocrinología incluye una evaluación médica integral centrada en el sistema endocrino y metabólico. Durante la consulta, nuestro especialista realizará:\n\n- Historia clínica detallada\n- Revisión de antecedentes familiares\n- Evaluación de síntomas relacionados con alteraciones hormonales\n- Examen físico completo\n- Revisión de exámenes previos\n- Solicitud de pruebas específicas según sea necesario\n\nTodo esto orientado a identificar posibles causas hormonales o metabólicas que puedan estar contribuyendo a problemas de peso u otras condiciones relacionadas."
      },
      {
        title: "¿Cuándo es necesaria?",
        text: "Una consulta endocrinológica es especialmente recomendada cuando:\n\n- Experimentas dificultad para perder peso a pesar de dieta y ejercicio\n- Presentas aumento de peso inexplicable\n- Sufres fatiga persistente\n- Tienes alteraciones en el ciclo menstrual\n- Presentas cambios en la distribución de la grasa corporal\n- Tienes antecedentes familiares de diabetes o enfermedades tiroideas\n- Has identificado alteraciones en exámenes hormonales previos"
      }
    ],
    benefits: [
      { text: "Evaluación médica especializada en sistema endocrino" },
      { text: "Identificación de posibles causas hormonales de problemas de peso" },
      { text: "Diagnóstico preciso de condiciones como hipotiroidismo, resistencia a la insulina, etc." },
      { text: "Plan de tratamiento personalizado para equilibrar niveles hormonales" },
      { text: "Seguimiento médico por especialistas en endocrinología" }
    ]
  }
];