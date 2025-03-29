// src/app/especialidades/hooks/useFilteredSpecialists.ts
import { useState, useEffect } from 'react';
import { Specialist, SpecialtyCategory } from '../types/specialist.types';
import { SpecialistsService } from '../services/specialists.service';

export const useFilteredSpecialists = () => {
  const [selectedCategory, setSelectedCategory] = useState<SpecialtyCategory>('todos');
  const [allSpecialists, setAllSpecialists] = useState<Specialist[]>([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los especialistas al iniciar
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setLoading(true);
        const data = await SpecialistsService.getAll();
        setAllSpecialists(data);
        setFilteredSpecialists(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los especialistas');
        console.error('Error fetching specialists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  // Filtrar especialistas cuando cambia la categoría seleccionada
  useEffect(() => {
    const filterSpecialists = async () => {
      try {
        setLoading(true);
        const filtered = await SpecialistsService.getByCategory(selectedCategory);
        setFilteredSpecialists(filtered);
      } catch (err) {
        setError('Error al filtrar especialistas');
        console.error('Error filtering specialists:', err);
      } finally {
        setLoading(false);
      }
    };

    filterSpecialists();
  }, [selectedCategory]);

  // Cambiar la categoría seleccionada
  const selectCategory = (category: SpecialtyCategory) => {
    setSelectedCategory(category);
  };

  return {
    allSpecialists,
    filteredSpecialists,
    selectedCategory,
    loading,
    error,
    selectCategory
  };
};