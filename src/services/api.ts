// src/services/api.ts
import { Specialty } from '../app/agendar-cita/types/appointment';

// Configuración de la URL base de la API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ID de empresa por defecto
export const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Función para hacer peticiones HTTP que funcione en cliente y servidor
const apiClient = async (url: string, options: RequestInit = {}) => {
  // En desarrollo o cuando la API no esté disponible, usar datos mock
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // Por ahora, usar datos mock en desarrollo
    return null; // Será manejado por cada función específica
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Simulación de datos para desarrollo
const mockDoctors = [
  { id: 1, nombre: "Dr. Helard Manrique", specialty: { name: "Endocrinología" } },
  { id: 2, nombre: "Dra. Ken Lly Cardoza", specialty: { name: "Endocrinología" } },
  { id: 3, nombre: "Dra. Melany Nito", specialty: { name: "Nutrición" } },
  { id: 4, nombre: "Lic. Luciana Castro", specialty: { name: "Psicología" } },
  { id: 5, nombre: "Dr. Alexander Fernandez", specialty: { name: "Prescripción del ejercicio" } }
];

const mockSpecialties = [
  { id: 1, name: "Endocrinología" },
  { id: 2, name: "Nutrición" },
  { id: 3, name: "Psicología" },
  { id: 4, name: "Prescripción del ejercicio" }
];

const mockSlots = [
  { id: 101, fecha: "2025-03-05", hora_inicio: "09:00", hora_fin: "09:30", duracion: "30" },
  { id: 102, fecha: "2025-03-05", hora_inicio: "10:00", hora_fin: "10:30", duracion: "30" },
  { id: 103, fecha: "2025-03-05", hora_inicio: "11:00", hora_fin: "11:30", duracion: "30" },
  { id: 104, fecha: "2025-03-06", hora_inicio: "09:00", hora_fin: "09:30", duracion: "30" },
  { id: 105, fecha: "2025-03-06", hora_inicio: "10:00", hora_fin: "10:30", duracion: "30" },
  { id: 106, fecha: "2025-03-07", hora_inicio: "09:00", hora_fin: "09:30", duracion: "30" },
  { id: 107, fecha: "2025-03-07", hora_inicio: "14:00", hora_fin: "14:30", duracion: "30" },
  { id: 108, fecha: "2025-03-07", hora_inicio: "15:00", hora_fin: "15:30", duracion: "30" }
];

export const getSpecialties = async (companyId: number = DEFAULT_COMPANY_ID) => {
  try {
    let specialties;
    
    // En desarrollo, usar datos mock directamente para evitar problemas de fetch
    if (process.env.NODE_ENV === 'development') {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      specialties = mockSpecialties;
    } else {
      // En producción, usar la API real
      const data = await apiClient(`${API_URL}/business/config/public/specialties/${companyId}`, {
        method: 'GET',
      });
      specialties = data || mockSpecialties; // Fallback a mock si la API falla
    }    // Filtrar la especialidad "Multiple" que no debe aparecer
    const filteredSpecialties = specialties.filter(
      (specialty: Specialty) => specialty.name && specialty.name.toLowerCase() !== 'multiple'
    );
    
    return filteredSpecialties;
  } catch (error) {
    console.error('Error al obtener las especialidades:', error);
    // Fallback a datos mock en caso de error y filtrar "Multiple"
    const filteredMockSpecialties = mockSpecialties.filter(
      specialty => specialty.name.toLowerCase() !== 'multiple'
    );
    return filteredMockSpecialties;
  }
};

/**
 * Obtiene los médicos de una empresa usando el endpoint público
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 */
export const getDoctorsByCompany = async (companyId: number = DEFAULT_COMPANY_ID) => {
  try {
    // En desarrollo, usar datos mock directamente
    if (process.env.NODE_ENV === 'development') {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockDoctors;
    }

    // En producción, usar la API real
    const data = await apiClient(`${API_URL}/business/config/public/doctors/${companyId}`, {
      method: 'GET',
    });
    
    return data || mockDoctors; // Fallback a mock si la API falla
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
    // Fallback a datos mock en caso de error
    return mockDoctors;
  }
};

/**
 * Obtiene los slots disponibles para un médico en un rango de fechas
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 * @param doctorId - ID del médico
 * @param startDate - Fecha de inicio (formato YYYY-MM-DD)
 * @param endDate - Fecha de fin (formato YYYY-MM-DD)
 */
export const getAvailableSlots = async (
  companyId: number = DEFAULT_COMPANY_ID,
  doctorId: number,
  startDate: string,
  endDate: string
) => {
  try {
    // En desarrollo, usar datos mock directamente
    if (process.env.NODE_ENV === 'development') {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1200));
      return { slots: mockSlots };
    }

    const queryParams = new URLSearchParams({
      company_id: companyId.toString(),
      doctor_id: doctorId.toString(),
      start_date: startDate,
      end_date: endDate
    });
    
    // En producción, usar la API real
    const data = await apiClient(`${API_URL}/business/calendar/public/available-slots?${queryParams}`, {
      method: 'GET',
    });
    
    return data || { slots: mockSlots }; // Fallback a mock si la API falla
  } catch (error) {
    console.error('Error al obtener los slots disponibles:', error);
    // Fallback a datos mock en caso de error
    return { slots: mockSlots };
  }
};