export interface ServicioPromocion {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  descripcionDetallada: string;
  precio: string;
  precioOriginal?: string;
  ubicacion: string;
  imagenes: string[];
  beneficios: string[];
  incluye: string[];
  testimonios: {
    nombre: string;
    comentario: string;
    rating: number;
    fecha: string;
  }[];
  promocion?: {
    tipo: string;
    descuento: string;
    vigencia: string;
  };
  categoria: string;
  keywords: string[];
  metaDescription: string;
}

export const serviciosPromociones: ServicioPromocion[] = [
  {
    id: "1",
    slug: "plan-integral-peso-saludable",
    titulo: "Paquete - Plan Integral de Peso Saludable",
    descripcion: "Un plan con evaluación médica especializada, asesoría nutricional, prescripción de la actividad física y apoyo psicológico, para lograr un peso ideal y ser feliz.",
    descripcionDetallada: "Nuestro Plan Integral de Peso Saludable es un programa multidisciplinario diseñado para transformar tu vida de manera sostenible. Combina la experiencia de endocrinólogos, nutricionistas, psicólogos y especialistas en ejercicio para crear un enfoque holístico que aborda todos los aspectos del control de peso. Este programa no solo se enfoca en la pérdida de peso, sino en establecer hábitos saludables duraderos que mejoren tu calidad de vida integral.",    precio: "S/ 1000.00",
    ubicacion: "Clínica CIATOB - Av. Velasco Astete 1952, Surco",
    imagenes: [
      "/images/servicios/plan-integral-1.jpg",
      "/images/servicios/plan-integral-2.jpg",
      "/images/servicios/plan-integral-3.jpg",
      "/images/servicios/plan-integral-4.jpg"
    ],
    beneficios: [
      "Evaluación médica integral especializada",
      "Control hormonal y metabólico completo",
      "Plan nutricional personalizado y sostenible",
      "Apoyo psicológico para cambio de hábitos",
      "Prescripción de ejercicio individualizada",
      "Seguimiento continuo multidisciplinario",
      "Estrategias para mantener el peso ideal",
      "Mejora de la autoestima y bienestar emocional"
    ],
    incluye: [
      "2 Consultas Endocrinológicas completas",
      "2 Consultas Nutricionales especializadas",
      "1 Consulta Psicológica para apoyo emocional",
      "1 Consulta de Ejercicio y actividad física",
      "Plan alimentario personalizado",
      "Rutina de ejercicios adaptada a tu condición",
      "Seguimiento telefónico semanal",
      "Material educativo digital",
      "Acceso a grupo de apoyo WhatsApp"
    ],
    testimonios: [
      {
        nombre: "Carmen Rodríguez",
        comentario: "El programa cambió mi vida completamente. Perdí 15 kilos de forma saludable y aprendí a mantener hábitos que me hacen sentir increíble. El apoyo del equipo fue fundamental.",
        rating: 5,
        fecha: "20 de Mayo, 2025"
      },
      {
        nombre: "Luis Mendoza",
        comentario: "Lo que más me gustó es el enfoque integral. No solo me ayudaron con la dieta, sino que trabajaron mi relación con la comida y me dieron herramientas para el ejercicio.",
        rating: 5,
        fecha: "15 de Mayo, 2025"
      },
      {
        nombre: "Ana Patricia Silva",
        comentario: "Excelente programa. El seguimiento constante y la coordinación entre especialistas hace la diferencia. Me siento más saludable y feliz.",
        rating: 5,
        fecha: "10 de Mayo, 2025"
      }
    ],
    promocion: {
      tipo: "Paquete integral",
      descuento: "Precio especial",
      vigencia: "30 de Julio, 2025"
    },
    categoria: "Paquetes",
    keywords: ["plan integral", "peso saludable", "endocrinología", "nutrición", "psicología", "ejercicio", "control de peso"],
    metaDescription: "Plan Integral de Peso Saludable con equipo multidisciplinario. Incluye consultas de endocrinología, nutrición, psicología y ejercicio para lograr un peso ideal de forma sostenible."
  },
  {
    id: "2",
    slug: "plan-equilibrio-total-control-peso",
    titulo: "Paquete - Plan Equilibrio Total y Control de Peso",
    descripcion: "Un plan de Equilibrio Total y Control de Peso que combina la ciencia de 4 especialidades, ofreciendo una solución equilibrada que busca no solo la pérdida de peso, sino también mejorar la calidad de vida y promover el bienestar general.",
    descripcionDetallada: "Nuestro Plan Equilibrio Total y Control de Peso es un programa científicamente diseñado que integra cuatro especialidades médicas para ofrecer una solución integral y equilibrada. Este enfoque multidisciplinario no se limita únicamente a la pérdida de peso, sino que busca transformar tu relación con la alimentación, el ejercicio y tu bienestar emocional. Combinamos la experiencia en endocrinología, nutrición y psicología para crear un plan personalizado que promueva cambios duraderos en tu estilo de vida.",    precio: "S/ 1000.00",
    ubicacion: "Clínica CIATOB - Av. Velasco Astete 1952, Surco",
    imagenes: [
      "/images/servicios/equilibrio-total-1.jpg",
      "/images/servicios/equilibrio-total-2.jpg",
      "/images/servicios/equilibrio-total-3.jpg",
      "/images/servicios/equilibrio-total-4.jpg"
    ],
    beneficios: [
      "Evaluación hormonal y metabólica especializada",
      "Control integral del peso de forma saludable",
      "Equilibrio emocional y manejo del estrés",
      "Plan nutricional científicamente respaldado",
      "Apoyo psicológico para cambios duraderos",
      "Mejora de la autoestima y confianza",
      "Prevención de enfermedades metabólicas",
      "Promoción del bienestar general"
    ],    incluye: [
      "2 Consultas Psicológicas especializadas",
      "2 Consultas Endocrinológicas completas", 
      "2 Consultas Nutricionales personalizadas"
    ],
    testimonios: [
      {
        nombre: "María Elena Vásquez",
        comentario: "Este programa cambió mi perspectiva sobre el control de peso. No solo perdí kilos, sino que gané equilibrio emocional y una mejor relación con la comida. El apoyo psicológico fue clave.",
        rating: 5,
        fecha: "25 de Mayo, 2025"
      },
      {
        nombre: "Carlos Alberto Ruiz",
        comentario: "La combinación de especialidades es perfecta. Me ayudaron tanto con mi metabolismo como con los aspectos emocionales que afectaban mi peso. Resultados increíbles.",
        rating: 5,
        fecha: "18 de Mayo, 2025"
      },
      {
        nombre: "Lucía Fernández",
        comentario: "Excelente programa integral. El enfoque científico y el apoyo emocional me dieron las herramientas para lograr un equilibrio real en mi vida.",
        rating: 5,
        fecha: "12 de Mayo, 2025"
      }
    ],
    promocion: {
      tipo: "Plan equilibrio",
      descuento: "Precio especial",
      vigencia: "15 de Agosto, 2025"
    },
    categoria: "Paquetes",
    keywords: ["equilibrio total", "control de peso", "endocrinología", "nutrición", "psicología", "bienestar integral"],
    metaDescription: "Plan Equilibrio Total y Control de Peso con enfoque científico multidisciplinario. Incluye consultas de endocrinología, nutrición y psicología para un bienestar integral."
  },
  {
    id: "3",
    slug: "come-inteligente-pierde-peso-saludablemente",
    titulo: "Paquete - Come Inteligente y Pierde Peso Saludablemente",
    descripcion: "Este plan está diseñado para guiar a las personas en su proceso de pérdida de peso a través de una alimentación consciente y equilibrada, sin recurrir a dietas extremas o métodos poco saludables. Aprende a comer y sin experimentos.",
    descripcionDetallada: "Nuestro programa 'Come Inteligente y Pierde Peso Saludablemente' es una metodología científicamente respaldada que te enseña a desarrollar una relación saludable con la comida. Este plan se enfoca en educar sobre buenos hábitos alimenticios que puedan mantenerse a largo plazo, garantizando una pérdida de peso segura y efectiva. No se trata de dietas restrictivas, sino de aprender a comer de manera inteligente, consciente y equilibrada para transformar tu estilo de vida de forma permanente.",    precio: "S/ 500.00",
    ubicacion: "Clínica CIATOB - Av. Velasco Astete 1952, Surco",
    imagenes: [
      "/images/servicios/come-inteligente-1.jpg",
      "/images/servicios/come-inteligente-2.jpg",
      "/images/servicios/come-inteligente-3.jpg",
      "/images/servicios/come-inteligente-4.jpg"
    ],
    beneficios: [
      "Aprendizaje de hábitos alimenticios saludables",
      "Pérdida de peso segura y sostenible",
      "Educación nutricional integral",
      "Mejora de la relación con la comida",
      "Desarrollo de consciencia alimentaria",
      "Estrategias para mantener el peso ideal",
      "Prevención del efecto rebote",
      "Mejora de la energía y vitalidad"
    ],    incluye: [
      "Plan Básico: 5 Consultas Nutricionales",
      "Plan Avanzado: 10 Consultas de Nutrición", 
      "Plan Avanzado: 1 Consulta Psicológica",
      "Plan Avanzado: 1 Consulta de Prescripción del Ejercicio"
    ],
    testimonios: [
      {
        nombre: "Sandra Morales",
        comentario: "Finalmente encontré un programa que me enseñó a comer bien sin restricciones extremas. Perdí peso de forma natural y he mantenido los resultados por más de un año.",
        rating: 5,
        fecha: "28 de Mayo, 2025"
      },
      {
        nombre: "Roberto Castillo",
        comentario: "Me encanta que no es una dieta más, sino una educación real sobre alimentación. Aprendí a comer inteligentemente y los resultados llegaron solos.",
        rating: 5,
        fecha: "22 de Mayo, 2025"
      },
      {
        nombre: "Mónica Rivera",
        comentario: "El enfoque en hábitos sostenibles es lo que hace la diferencia. No he vuelto a hacer dietas extremas, simplemente como bien y me siento genial.",
        rating: 5,
        fecha: "16 de Mayo, 2025"
      }
    ],
    promocion: {
      tipo: "Programa educativo",
      descuento: "Precio especial",
      vigencia: "30 de Agosto, 2025"
    },    categoria: "Paquetes",
    keywords: ["alimentación inteligente", "pérdida de peso saludable", "educación nutricional", "hábitos alimentarios", "nutrición consciente"],
    metaDescription: "Programa Come Inteligente y Pierde Peso Saludablemente. Aprende a desarrollar hábitos alimenticios sostenibles sin dietas extremas. Planes básico y avanzado disponibles."
  }
];

export function getServicioBySlug(slug: string): ServicioPromocion | undefined {
  return serviciosPromociones.find(servicio => servicio.slug === slug);
}

export function getAllSlugs(): string[] {
  return serviciosPromociones.map(servicio => servicio.slug);
}