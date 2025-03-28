// src/hooks/useDoctors.ts
import { useState, useEffect } from 'react';
import { Doctor } from '../types/appointment';
import { AppointmentService } from '../services/appointment.service';

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
        const data = await AppointmentService.fetchDoctors();
        setDoctors(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido al cargar médicos'));
        console.error('Error loading doctors:', err);
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