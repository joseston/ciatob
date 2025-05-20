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
    content: "Si estas pensando en un lugar para bajar de peso donde te den tranquilidad, apoyo y sobre todo te educan sobre como cuidarte y alimentarte, sin duda alguna ese es CIATOB con la Dra. Katty Manrique y la Lic. Alondra Ramirez, llevo 5 meses donde desde el primer mes vi muchos cambios no solo físicos en mí; pero lo que mas valoro es que es cero ansiedad, ya que no te mandan dietas imposibles sino que te enseñan a que comer y cuanto de lo que se prepare en tu casa para toda la familia, ósea nada de platos aparte y el stress que eso te puede generar.",
    patientInfo: "Gabriela Rojas",
    rating: 5
  },
  {
    id: 5,
    content: "Después de intentar buscar mi mejor versión sobre todo bienestar por recomendación conocí Ciatob no solo he podido cambiar mi vida si no que ahora me siento con más vida con más energía radiante segura de mi misma realmente he vuelto a nacer estoy muy agradecida con el Dr Helard Manrique y la Lic Alondra Ramirez que se esmeraron desde el día uno por ayudarme a lograr los resultados que deseaba tener.",
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
    image: "https://static.scieluxe.com/files/alondra-ramirez.jpg",
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