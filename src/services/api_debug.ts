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
export const DEFAULT_USER_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_USER_ID) || 19;

// Función para hacer peticiones HTTP que funcione en cliente y servidor
const apiClient = async (url: string, options: RequestInit = {}) => {
  try {
    console.log(`🌐 [Frontend DEBUG] ===== apiClient =====`);
    console.log(`🌐 [Frontend DEBUG] URL: ${url}`);
    console.log(`🌐 [Frontend DEBUG] Options:`, options);
    console.log(`🌐 [Frontend DEBUG] Entorno: ${process.env.NODE_ENV}`);
    
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
    
    console.log(`🌐 [Frontend DEBUG] Response status: ${response.status}`);
    console.log(`🌐 [Frontend DEBUG] Response ok: ${response.ok}`);

    if (!response.ok) {
      console.log(`🌐 [Frontend DEBUG] ❌ Response no OK:`, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`🌐 [Frontend DEBUG] Response data:`, data);
    console.log(`🌐 [Frontend DEBUG] ===== FIN apiClient =====`);

    return data;
  } catch (error) {
    console.error('❌ [Frontend DEBUG] Error en petición al backend:', error);
    console.error('❌ [Frontend DEBUG] URL que falló:', url);
    throw error;
  }
};

/**
 * Obtiene las especialidades de una empresa usando el endpoint público
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 */
export const getSpecialties = async (companyId: number = DEFAULT_COMPANY_ID) => {
  try {
    // 🚨 LOG MUY VISIBLE PARA PRODUCCIÓN
    console.log(`%c🚨 PRODUCCIÓN - Llamando especialidades para company ID: ${companyId}`, 'background: red; color: white; font-size: 20px; padding: 10px;');
    
    console.log(`🔍 [Frontend DEBUG] ===== getSpecialties =====`);
    console.log(`🔍 [Frontend DEBUG] companyId recibido: ${companyId}`);
    console.log(`🔍 [Frontend DEBUG] DEFAULT_COMPANY_ID: ${DEFAULT_COMPANY_ID}`);
    console.log(`🔍 [Frontend DEBUG] process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID: ${process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID}`);
    console.log(`🔍 [Frontend DEBUG] API_URL: ${API_URL}`);
    
    const url = `${API_URL}/business/config/public/specialties/${companyId}`;
    console.log(`🔄 [Frontend DEBUG] Obteniendo especialidades del backend: ${url}`);
    
    const data = await apiClient(url, {
      method: 'GET',
    });
    
    console.log('✅ [Frontend DEBUG] Especialidades obtenidas del backend:', data);
    console.log('✅ [Frontend DEBUG] Tipo de data:', typeof data);
    console.log('✅ [Frontend DEBUG] Es array?:', Array.isArray(data));
    console.log('✅ [Frontend DEBUG] Longitud:', data?.length);
    
    // 🚨 LOG MUY VISIBLE PARA LA RESPUESTA
    console.log(`%c🚨 RESPUESTA ESPECIALIDADES - Total: ${data?.length || 0}`, 'background: green; color: white; font-size: 16px; padding: 5px;');
    if (data && Array.isArray(data)) {
      data.forEach((spec: any, index: number) => {
        console.log(`%c   ${index + 1}. ${spec.name} (ID: ${spec.id})`, 'background: green; color: white; font-size: 12px; padding: 2px;');
      });
    }
    
    // Filtrar la especialidad "Multiple" que no debe aparecer
    const filteredSpecialties = data.filter(
      (specialty: Specialty) => specialty.name && specialty.name.toLowerCase() !== 'multiple'
    );
    
    console.log('✅ [Frontend DEBUG] Especialidades filtradas:', filteredSpecialties);
    console.log('✅ [Frontend DEBUG] Lista de nombres:', filteredSpecialties.map((s: Specialty) => s.name));
    console.log(`🔍 [Frontend DEBUG] ===== FIN getSpecialties =====`);
    
    // 🚨 LOG FINAL MUY VISIBLE
    console.log(`%c🚨 RESULTADO FINAL - ${filteredSpecialties.length} especialidades filtradas`, 'background: blue; color: white; font-size: 16px; padding: 5px;');
    
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
    // 🚨 LOG MUY VISIBLE PARA PRODUCCIÓN
    console.log(`%c🚨 PRODUCCIÓN - Llamando médicos para company ID: ${companyId}`, 'background: orange; color: white; font-size: 20px; padding: 10px;');
    
    console.log(`🔍 [Frontend DEBUG] ===== getDoctorsByCompany =====`);
    console.log(`🔍 [Frontend DEBUG] companyId recibido: ${companyId}`);
    console.log(`🔍 [Frontend DEBUG] DEFAULT_COMPANY_ID: ${DEFAULT_COMPANY_ID}`);
    console.log(`🔍 [Frontend DEBUG] process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID: ${process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID}`);
    console.log(`🔍 [Frontend DEBUG] API_URL: ${API_URL}`);
    
    const url = `${API_URL}/business/config/public/doctors/${companyId}`;
    console.log(`🔄 [Frontend DEBUG] Obteniendo médicos del backend: ${url}`);
    
    const data = await apiClient(url, {
      method: 'GET',
    });
    
    console.log('✅ [Frontend DEBUG] Médicos obtenidos del backend:', data);
    console.log('✅ [Frontend DEBUG] Tipo de data:', typeof data);
    console.log('✅ [Frontend DEBUG] Es array?:', Array.isArray(data));
    console.log('✅ [Frontend DEBUG] Longitud:', data?.length);
    
    // 🚨 LOG MUY VISIBLE PARA LA RESPUESTA
    console.log(`%c🚨 RESPUESTA MÉDICOS - Total: ${data?.length || 0}`, 'background: purple; color: white; font-size: 16px; padding: 5px;');
    if (Array.isArray(data) && data.length > 0) {
      console.log('✅ [Frontend DEBUG] Lista de doctores:');
      data.forEach((doctor: any, index: number) => {
        console.log(`%c   ${index + 1}. ${doctor.nombre} (ID: ${doctor.id})`, 'background: purple; color: white; font-size: 12px; padding: 2px;');
      });
    }
    
    console.log(`🔍 [Frontend DEBUG] ===== FIN getDoctorsByCompany =====`);
    
    // 🚨 LOG FINAL MUY VISIBLE
    console.log(`%c🚨 RESULTADO FINAL - ${data?.length || 0} médicos obtenidos`, 'background: navy; color: white; font-size: 16px; padding: 5px;');
    
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
