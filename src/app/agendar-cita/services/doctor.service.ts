// src/app/agendar-cita/services/doctor.service.ts
import { Doctor } from '../types/appointment';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Interfaz que representa la respuesta cruda de la API para un doctor
interface ApiDoctor {
  id: number;
  nombre: string;
  status: boolean;
  profession?: string;
  cmp_id?: string;
  role?: string;
  specialty?: {
    id: number;
    name: string;
  } | null;
}

// Cliente API reutilizable y genérico para manejar cualquier tipo de respuesta
const apiClient = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
    }

    // Se devuelve la respuesta JSON, convertida al tipo genérico T
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La petición tardó demasiado tiempo.');
      }
      if (error.message.includes('fetch')) {
        throw new Error('No se pudo conectar con el servidor. Verifique que el backend esté funcionando.');
      }
    }
    throw error;
  }
};

/**
 * Servicio para gestionar los doctores de CIATOB
 */
export const DoctorService = {
  /**
   * Obtiene los doctores de la empresa CIATOB
   */
  fetchDoctors: async (): Promise<Doctor[]> => {
    try {
      const url = `${API_URL}/business/config/public/doctors/${DEFAULT_COMPANY_ID}`;
      // Se llama a apiClient especificando el tipo de respuesta esperado: ApiDoctor[]
      const data = await apiClient<ApiDoctor[]>(url, { method: 'GET' });
      
      const validDoctors: Doctor[] = data.filter((doctor) => 
        doctor && 
        doctor.id && 
        doctor.nombre && 
        doctor.status === true
      ).map((doctor) => ({
        id: doctor.id,
        nombre: doctor.nombre,
        profession: doctor.profession || 'medico',
        cmp_id: doctor.cmp_id,
        role: doctor.role,
        specialty: doctor.specialty ? {
          id: doctor.specialty.id,
          name: doctor.specialty.name
        } : null
      }));
      
      return validDoctors;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtiene doctores filtrados por especialidad
   */
  fetchDoctorsBySpecialty: async (specialtyId: number): Promise<Doctor[]> => {
    try {
      const allDoctors = await DoctorService.fetchDoctors();
      return allDoctors.filter(doctor => 
        doctor.specialty && doctor.specialty.id === specialtyId
      );
    } catch (error) {
      throw error;
    }
  },

  /**
   * Método de respaldo usando datos mock
   */
  getMockDoctors: (): Doctor[] => {
    return [
      {
        id: 1,
        nombre: 'Dr. Juan Pérez',
        profession: 'medico',
        cmp_id: '12345',
        role: 'contratado',
        specialty: { id: 1, name: 'Cardiología' }
      },
      {
        id: 2,
        nombre: 'Dra. María García',
        profession: 'medico',
        cmp_id: '67890',
        role: 'contratado',
        specialty: { id: 2, name: 'Dermatología' }
      }
    ];
  }
};