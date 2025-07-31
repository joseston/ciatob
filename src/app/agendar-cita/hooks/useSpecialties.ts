import { useState, useEffect } from 'react';
import { Specialty } from '../types/appointment';
import { SpecialtyService } from '../services/specialty.service';

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
        setError(null);
        
        // Intentar obtener datos del backend
        const data = await SpecialtyService.fetchSpecialties();
        setSpecialties(data);
        
      } catch (err) {
        console.warn('⚠️ Error al conectar con backend, usando datos mock');
        
        // Si falla el backend, usar datos mock
        const mockData = SpecialtyService.getMockSpecialties();
        setSpecialties(mockData);
        
        setError(err instanceof Error ? err : new Error('Error al cargar especialidades del servidor'));
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