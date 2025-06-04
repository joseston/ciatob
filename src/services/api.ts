// src/services/api.ts
// API Service para CIATOB - Sistema de Citas Médicas
// 
// Comportamiento:
// - SOLO usa datos del backend real (localhost:3002 -> localhost:8000/api)
// - NO usa datos mock - Si no hay datos del backend, muestra estados vacíos
// - Configurado para Company ID 1 en desarrollo
// - Incluye timeout de 5 segundos para evitar esperas largas
//
import { Specialty } from '../app/agendar-cita/types/appointment';

// Configuración de la URL base de la API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ID de empresa por defecto
export const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// ID de usuario por defecto (para desarrollo)
export const DEFAULT_USER_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_USER_ID) || 2;

// Función para hacer peticiones HTTP que funcione en cliente y servidor
const apiClient = async (url: string, options: RequestInit = {}) => {
  try {
    // Agregar timeout para evitar esperas largas
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en petición al backend:', error);
    throw error;
  }
};

/**
 * Obtiene las especialidades de una empresa usando el endpoint público
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 */
export const getSpecialties = async (companyId: number = DEFAULT_COMPANY_ID) => {
  try {
    console.log(`🔄 Obteniendo especialidades del backend: ${API_URL}/business/config/public/specialties/${companyId}`);
    
    const data = await apiClient(`${API_URL}/business/config/public/specialties/${companyId}`, {
      method: 'GET',
    });
    
    console.log('✅ Especialidades obtenidas del backend:', data);
    
    // Filtrar la especialidad "Multiple" que no debe aparecer
    const filteredSpecialties = data.filter(
      (specialty: Specialty) => specialty.name && specialty.name.toLowerCase() !== 'multiple'
    );
    
    return filteredSpecialties;
  } catch (error) {
    console.error('❌ Error al obtener especialidades del backend:', error);
    throw new Error('No se pudieron cargar las especialidades. Verifique que el backend esté funcionando.');
  }
};

/**
 * Obtiene los médicos de una empresa usando el endpoint público
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 */
export const getDoctorsByCompany = async (companyId: number = DEFAULT_COMPANY_ID) => {
  try {
    console.log(`🔄 Obteniendo médicos del backend: ${API_URL}/business/config/public/doctors/${companyId}`);
    
    const data = await apiClient(`${API_URL}/business/config/public/doctors/${companyId}`, {
      method: 'GET',
    });
    
    console.log('✅ Médicos obtenidos del backend:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al obtener médicos del backend:', error);
    throw new Error('No se pudieron cargar los médicos. Verifique que el backend esté funcionando.');
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
    
    const url = `${API_URL}/business/calendar/public/available-slots?${queryParams}`;
    console.log(`🔄 Obteniendo slots del backend: ${url}`);
    
    const data = await apiClient(url, {
      method: 'GET',
    });
    
    console.log('✅ Slots obtenidos del backend:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error al obtener slots del backend:', error);
    throw new Error('No se pudieron cargar los horarios disponibles. Verifique que el backend esté funcionando.');
  }
};