// src/app/especialidades/types/specialist.types.ts

export type SpecialtyCategory = 'todos' | 'endocrinologia' | 'nutricion' | 'psicologia' | 'prescripcion-ejercicio';

// Tipo para definir el género del especialista
export type Gender = 'male' | 'female';

export interface Review {
  id: number;
  content: string;
  patientInfo: string;
  rating: number;
}

export interface Specialist {
  id: number;
  name: string;
  specialty: string;
  category: SpecialtyCategory; // Categoría para filtrado
  gender?: Gender; // Campo para indicar si es Dr. o Dra.
  image: string;
  description?: string;
  reviews?: Review[];
  averageRating?: number;
}

export interface SpecialistsState {
  all: Specialist[];
  filtered: Specialist[];
  selectedCategory: SpecialtyCategory;
  loading: boolean;
  error: string | null;
}