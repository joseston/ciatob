// src/services/api.ts
// API Service para CIATOB - Sistema de Citas Médicas
// 
// Comportamiento:
// - SOLO usa datos del backend real (localhost:3002 -> localhost:8000/api)
// - NO usa datos mock - Si no hay datos del backend, muestra estados vacíos
// - Configurado para Company ID 1 en desarrollo
// - Incluye timeout de 5 segundos para evitar esperas largas
//

// src/services/api.ts
// API Service para CIATOB - Sistema de Citas Médicas
// 
// Comportamiento:
// - SOLO usa datos del backend real (localhost:3002 -> localhost:8000/api)
// - NO usa datos mock - Si no hay datos del backend, muestra estados vacíos
// - Configurado para Company ID 1 en desarrollo
// - Incluye timeout de 5 segundos para evitar esperas largas
//

// CORRECCIÓN: Se importan todos los tipos necesarios del archivo de tipos.
// Se asume una ruta relativa estándar desde 'src/services/' a 'src/types/'.
import { Specialty, Doctor, Slot } from '../app/agendar-cita/types/appointment';

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
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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

    // El método .json() devuelve una promesa que resuelve a 'any'.
    // El tipado se hará en la función que llama a apiClient.
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
 * CORRECCIÓN: Se añade el tipo de retorno Promise<Specialty[]> para mayor seguridad.
 */
export const getSpecialties = async (companyId: number = DEFAULT_COMPANY_ID): Promise<Specialty[]> => {
  try {
    console.log(`📸 [Frontend DEBUG] ===== getSpecialties =====`);
    const url = `${API_URL}/business/config/public/specialties/${companyId}`;
    console.log(`🔄 [Frontend DEBUG] Obteniendo especialidades del backend: ${url}`);
    
    // CORRECCIÓN: Se tipa la variable 'data' para que TypeScript sepa que es un array de Specialty.
    const data: Specialty[] = await apiClient(url, {
      method: 'GET',
    });
    
    console.log('✅ [Frontend DEBUG] Especialidades obtenidas del backend:', data);
    
    // El tipado en .filter ahora es inferido y correcto gracias a la corrección anterior.
    const filteredSpecialties = data.filter(
      (specialty) => specialty.name && specialty.name.toLowerCase() !== 'multiple'
    );
    
    console.log('✅ [Frontend DEBUG] Especialidades filtradas:', filteredSpecialties);
    console.log(`🔍 [Frontend DEBUG] ===== FIN getSpecialties =====`);
    
    return filteredSpecialties;
  } catch (error) {
    console.error('❌ Error al obtener especialidades del backend:', error);
    throw new Error('No se pudieron cargar las especialidades. Verifique que el backend esté funcionando.');
  }
};

/**
 * Obtiene los médicos de una empresa usando el endpoint público
 * @param companyId - ID de la empresa (por defecto se usa el valor de la variable de entorno)
 * CORRECCIÓN: Se añade el tipo de retorno Promise<Doctor[]>
 */
export const getDoctorsByCompany = async (companyId: number = DEFAULT_COMPANY_ID): Promise<Doctor[]> => {
  try {
    console.log(`👨‍⚕️ [Frontend DEBUG] ===== getDoctorsByCompany =====`);
    const url = `${API_URL}/business/config/public/doctors/${companyId}`;
    console.log(`🔄 [Frontend DEBUG] Obteniendo médicos del backend: ${url}`);
    
    // CORRECCIÓN: Se tipa la variable 'data' como un array de Doctor.
    const data: Doctor[] = await apiClient(url, {
      method: 'GET',
    });
    
    console.log('✅ [Frontend DEBUG] Médicos obtenidos del backend:', data);
    
    if (Array.isArray(data) && data.length > 0) {
      console.log('✅ [Frontend DEBUG] Lista de doctores:');
      // SOLUCIÓN AL ERROR: Se reemplaza 'any' por el tipo 'Doctor'.
      data.forEach((doctor: Doctor) => {
        console.log(`  - ${doctor.nombre} (ID: ${doctor.id})`);
      });
    }
    
    console.log(`🔍 [Frontend DEBUG] ===== FIN getDoctorsByCompany =====`);
    
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
 * CORRECCIÓN: Se añade el tipo de retorno Promise<Slot[]>. Esto probablemente solucione el error de la línea 149.
 */
export const getAvailableSlots = async (
  companyId: number = DEFAULT_COMPANY_ID,
  doctorId: number,
  startDate: string,
  endDate: string
): Promise<Slot[]> => {
  try {
    const queryParams = new URLSearchParams({
      company_id: companyId.toString(),
      doctor_id: doctorId.toString(),
      start_date: startDate,
      end_date: endDate
    });
    
    const url = `${API_URL}/business/calendar/public/available-slots?${queryParams}`;
    console.log(`🔄 Obteniendo slots del backend: ${url}`);
    
    // CORRECCIÓN: Se tipa el resultado esperado.
    const data: Slot[] = await apiClient(url, {
      method: 'GET',
    });
    
    console.log('✅ Slots obtenidos del backend:', data);
    
    return data;
  } catch (error)
 {
    console.error('❌ Error al obtener slots del backend:', error);
    throw new Error('No se pudieron cargar los horarios disponibles. Verifique que el backend esté funcionando.');
  }
};