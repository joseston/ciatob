// src/services/api.ts

// Configuración de la URL base de la API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ID de empresa por defecto
export const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Simulación de datos para desarrollo
const mockDoctors = [
  { id: 1, nombre: "Dr. Helard Manrique", specialty: { name: "Endocrinología" } },
  { id: 2, nombre: "Dra. Ken Lly Cardoza", specialty: { name: "Endocrinología" } },
  { id: 3, nombre: "Dra. Melany Nito", specialty: { name: "Nutrición" } },
  { id: 4, nombre: "Lic. Luciana Castro", specialty: { name: "Psicología" } },
  { id: 5, nombre: "Dr. Alexander Fernandez", specialty: { name: "Medicina Deportiva" } }
];

const mockSpecialties = [
  { id: 1, name: "Endocrinología" },
  { id: 2, name: "Nutrición" },
  { id: 3, name: "Psicología" },
  { id: 4, name: "Medicina Deportiva" }
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
    // Usamos el endpoint público que no requiere autenticación
    const response = await fetch(`${API_URL}/business/config/public/specialties/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener las especialidades');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en getSpecialties:', error);
    console.log('Usando datos simulados como fallback');
    // Si falla la petición, usamos datos simulados como fallback
    return mockSpecialties;
  }
};

/**
 * Obtiene los médicos de una empresa usando el endpoint público
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 */
export const getDoctorsByCompany = async (companyId: number = DEFAULT_COMPANY_ID) => {
  try {
    // Usamos el endpoint público que no requiere autenticación
    const response = await fetch(`${API_URL}/business/config/public/doctors/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los médicos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en getDoctorsByCompany:', error);
    console.log('Usando datos simulados como fallback');
    // Si falla la petición, usamos datos simulados como fallback
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
    const queryParams = new URLSearchParams({
      company_id: companyId.toString(),
      doctor_id: doctorId.toString(),
      start_date: startDate,
      end_date: endDate
    });
    
    // Usamos el endpoint público que no requiere autenticación
    const response = await fetch(`${API_URL}/business/calendar/public/available-slots?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los slots disponibles');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en getAvailableSlots:', error);
    console.log('Usando datos simulados como fallback');
    // Si falla la petición, usamos datos simulados como fallback
    return { slots: mockSlots };
  }
};