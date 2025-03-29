// src/app/especialidades/types/specialist.types.ts

export type SpecialtyCategory = 'todos' | 'endocrinologia' | 'nutricion' | 'psicologia' | 'deportologia';

export interface Specialist {
  id: number;
  name: string;
  specialty: string;
  category: SpecialtyCategory; // Categoría para filtrado
  image: string;
  description?: string;
}

export interface SpecialistsState {
  all: Specialist[];
  filtered: Specialist[];
  selectedCategory: SpecialtyCategory;
  loading: boolean;
  error: string | null;
}