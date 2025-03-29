// src/app/especialidades/hooks/useSpecialists.ts
import { useState, useEffect } from 'react';
import { Specialist, SpecialtyCategory } from '../types/specialist.types';
import { SpecialistsService } from '../services/specialists.service';

export const useSpecialists = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar especialistas al montar el componente
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setLoading(true);
        const data = await SpecialistsService.getAll();
        setSpecialists(data);
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

  return {
    specialists,
    loading,
    error
  };
};