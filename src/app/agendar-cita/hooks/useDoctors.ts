// src/hooks/useDoctors.ts
import { useState, useEffect } from 'react';
import { Doctor } from '../types/appointment';
import { DoctorService } from '../services/doctor.service';

interface UseDoctorsReturn {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: Error | null;
  selectDoctor: (doctor: Doctor | null) => void;  // Modificado para aceptar null
}

/**
 * Hook para gestionar la carga y selección de médicos
 */
export const useDoctors = (): UseDoctorsReturn => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Intentar obtener datos del backend
        const data = await DoctorService.fetchDoctors();
        setDoctors(data);
        
      } catch (err) {
        console.warn('⚠️ Error al conectar con backend para doctores, usando datos mock');
        
        // Si falla el backend, usar datos mock
        const mockData = DoctorService.getMockDoctors();
        setDoctors(mockData);
        
        setError(err instanceof Error ? err : new Error('Error al cargar doctores del servidor'));
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const selectDoctor = (doctor: Doctor | null) => {  // Modificado para aceptar null
    setSelectedDoctor(doctor);
  };

  return {
    doctors,
    selectedDoctor,
    loading,
    error,
    selectDoctor
  };
};