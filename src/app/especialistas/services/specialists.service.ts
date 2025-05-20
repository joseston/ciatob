// src/app/especialidades/services/specialists.service.ts
import { Specialist, SpecialtyCategory, Review } from '../types/specialist.types';

// Datos estáticos de reviews/testimonios
const reviews: Review[] = [
  {
    id: 1,
    content: "Después de muchos intentos fallidos con dietas y tratamientos, decidí probar una nueva alternativa en CIATOB. Desde el primer mes, noté una diferencia real: sin ansiedad, sin restricciones extremas y con resultados sostenibles. Hoy me siento más ligera, activa y segura. Volver a disfrutar de mi ropa y de mi cuerpo ha sido increíble. Gracias a la Dra. Katty Manrique y su equipo por acompañarme con un enfoque profesional y humano.",
    patientInfo: "Paciente, 60 años",
    rating: 5
  },
  {
    id: 2,
    content: "Llegué a CIATOB por recomendación y desde el primer momento el trato fue excelente. La Lic. Valeria me explicó todo con mucha paciencia y claridad, dándome la confianza que necesitaba. Me sentí muy cómoda, seguir su plan fue fácil y lo mejor es que vi cambios positivos muy pronto. ¡Estoy muy satisfecha y motivada!",
    patientInfo: "Jimena Oblitas",
    rating: 5
  },
  {
    id: 3,
    content: "Me sentí comprendido y muy cómodo con la Lic. Valeria desde el principio. Fue muy clara con mi plan de alimentación y valoro enormemente su ayuda para coordinar con otros especialistas, lo cual fue clave para mi salud. He mejorado notablemente y cambiado mi estilo de vida. Su profesionalismo y apoyo constante son destacables.",
    patientInfo: "José Hugo",
    rating: 5
  },
  {
    id: 4,
    content: "En CIATOB, con la Dra. Katty Manrique y la Lic. Alondra Ramirez, encontré el apoyo para bajar de peso sin ansiedad. En 5 meses logré cambios notables porque me enseñaron a alimentarme correctamente con la misma comida familiar, evitando dietas imposibles y el estrés de preparar platos separados.",
    patientInfo: "Gabriela Rojas",
    rating: 5
  },
  {
    id: 5,
    content: "Gracias a una recomendación conocí CIATOB. El Dr. Helard Manrique y la Lic. Alondra Ramirez me ayudaron desde el primer día a lograr mi mejor versión. Ahora tengo más energía, me siento radiante y segura de mí misma. He renacido y estoy muy agradecida.",
    patientInfo: "Julia Rivera",
    rating: 5
  }
];

// Datos estáticos de especialistas
export const specialists: Specialist[] = [
  {
    id: 1,
    name: "Helard Manrique ",
    specialty: "Endocrinología",
    category: "endocrinologia",
    gender: "male", // Dr.
    image: "https://static.scieluxe.com/files/helard-manrique.png",
    reviews: [reviews[4]], // Añadido el testimonio de Julia Rivera
    averageRating: 5
  },
  {
    id: 2,
    name: "Kenlly Cardoza",
    specialty: "Endocrinología",
    category: "endocrinologia",
    gender: "male", // Dra.
    image: "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
    reviews: [],
    averageRating: 0
  },
  {
    id: 3,
    name: "Guadalupe Ruiz",
    specialty: "Endocrinología",
    category: "endocrinologia",
    gender: "female", // Dra.
    image: "https://static.scieluxe.com/files/guadalupe-ruiz.JPG",
    reviews: [],
    averageRating: 0
  },
  {
    id: 4,
    name: "Katty Manrique ",
    specialty: "Endocrinología",
    category: "endocrinologia",
    gender: "female", // Dra.
    image: "https://static.scieluxe.com/files/katty-manrique.jpg",
    reviews: [reviews[0], reviews[3]], // Añadido el testimonio de Gabriela Rojas
    averageRating: 5
  },
  {
    id: 5,
    name: "Alondra Ramirez",
    specialty: "Nutrición",
    category: "nutricion",
    gender: "female", // Este campo no afectará el título ya que en nutrición son Lic.
    image: "https://static.scieluxe.com/files/alondra-ramirez.webp",
    reviews: [reviews[3], reviews[4]], // Añadidos ambos testimonios que la mencionan
    averageRating: 5
  },
  {
    id: 6,
    name: "Valeria Vilchez",
    specialty: "Nutrición",
    category: "nutricion",
    gender: "female", // Este campo no afectará el título ya que en nutrición son Lic.
    image: "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg",
    reviews: [reviews[1], reviews[2]],
    averageRating: 5
  },
  {
    id: 7,
    name: "Luciana Castro",
    specialty: "Psicología",
    category: "psicologia",
    gender: "female", // Lic.
    image: "https://static.scieluxe.com/files/luciana-castro.jpg",
    reviews: [],
    averageRating: 0
  },
  {
    id: 8,
    name: "Alexander Fernandez",
    specialty: "Prescripción del ejercicio",
    category: "deportologia",
    gender: "male", // Lic.
    image: "https://static.scieluxe.com/files/alexander-fernandez.JPG",
    reviews: [],
    averageRating: 0
  }
];

export const categoryLabels: Record<SpecialtyCategory, string> = {
  todos: "Todos",
  endocrinologia: "Endocrinología",
  nutricion: "Nutrición",
  psicologia: "Psicología",
  deportologia: "Prescripción del ejercicio"
};

// Funciones de servicio (simula llamadas a API)
export const SpecialistsService = {
  // Obtener todos los especialistas
  getAll: (): Promise<Specialist[]> => {
    // Simulamos un delay para mostrar el estado de carga
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(specialists);
      }, 500);
    });
  },

  // Filtrar especialistas por categoría
  getByCategory: (category: SpecialtyCategory): Promise<Specialist[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === 'todos') {
          resolve(specialists);
        } else {
          resolve(specialists.filter(specialist => specialist.category === category));
        }
      }, 300);
    });
  },

  // Obtener testimonios/reviews para un especialista específico
  getSpecialistReviews: (specialistId: number): Promise<Review[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const specialist = specialists.find(s => s.id === specialistId);
        resolve(specialist?.reviews || []);
      }, 300);
    });
  }
};