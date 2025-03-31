// src/app/especialidades/services/specialists.service.ts
import { Specialist, SpecialtyCategory } from '../types/specialist.types';

// Datos estáticos de especialistas
export const specialists: Specialist[] = [
  {
    id: 1,
    name: "Helard Manrique ",
    specialty: "Endocrinología",
    category: "endocrinologia",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
  },
  {
    id: 2,
    name: "Kenlly Cardoza",
    specialty: "Endocrinología",
    category: "endocrinologia",
    image: "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
  },
  {
    id: 3,
    name: "Guadalupe Ruiz",
    specialty: "Endocrinología",
    category: "endocrinologia",
    image: "https://static.scieluxe.com/files/guadalupe-ruiz.JPG",
  },
  {
    id: 4,
    name: "Katty Manrique Franco",
    specialty: "Endocrinología",
    category: "endocrinologia",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
  },
  {
    id: 5,
    name: "Alondra Ramirez",
    specialty: "Nutrición",
    category: "nutricion",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
  },
  {
    id: 6,
    name: "Valeria Vilchez",
    specialty: "Nutrición",
    category: "nutricion",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
  },
  {
    id: 7,
    name: "Luciana Castro",
    specialty: "Psicología",
    category: "psicologia",
    image: "https://static.scieluxe.com/files/prueba-medico-1735423911.jpg",
  },
  {
    id: 8,
    name: "Alexander Fernandez",
    specialty: "Deportología",
    category: "deportologia",
    image: "https://static.scieluxe.com/files/alexander-fernandez.JPG",
  }
];

export const categoryLabels: Record<SpecialtyCategory, string> = {
  todos: "Todos",
  endocrinologia: "Endocrinología",
  nutricion: "Nutrición",
  psicologia: "Psicología",
  deportologia: "Deportología"
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
  }
};