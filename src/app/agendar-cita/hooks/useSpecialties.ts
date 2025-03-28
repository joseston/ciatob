import { useState, useEffect } from 'react';
import { Specialty } from '../types/appointment';
import { getSpecialties } from '@/services/api';

interface UseSpecialtiesReturn {
  specialties: Specialty[];
  selectedSpecialty: Specialty | null;
  loading: boolean;
  error: Error | null;
  selectSpecialty: (specialtyId: number) => void;
}

/**
 * Hook para gestionar la carga y selección de especialidades
 */
export const useSpecialties = (): UseSpecialtiesReturn => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const data = await getSpecialties();
        setSpecialties(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido al cargar especialidades'));
        console.error('Error loading specialties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const selectSpecialty = (specialtyId: number) => {
    const specialty = specialties.find(s => s.id === specialtyId);
    if (specialty) {
      setSelectedSpecialty(specialty);
    }
  };

  return {
    specialties,
    selectedSpecialty,
    loading,
    error,
    selectSpecialty
  };
};