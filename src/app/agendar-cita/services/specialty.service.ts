// src/app/agendar-cita/services/specialty.service.ts
import { Specialty } from '../types/appointment';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Cliente API genérico y reutilizable
const apiClient = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  console.log('🔄 SpecialtyService.apiClient - Iniciando petición:', { url, options });
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    console.log('📡 SpecialtyService.apiClient - Enviando fetch a:', url);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);
    console.log('✅ SpecialtyService.apiClient - Respuesta recibida:', { 
      status: response.status, 
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorMessage = `Error del servidor: ${response.status} - ${response.statusText}`;
      console.error('❌ SpecialtyService.apiClient - Error en respuesta:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('📊 SpecialtyService.apiClient - Datos recibidos:', data);
    return data as T;
  } catch (error) {
    console.error('❌ SpecialtyService.apiClient - Error en petición:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        const timeoutError = 'La petición tardó demasiado tiempo.';
        console.error('⏰ SpecialtyService.apiClient - Timeout:', timeoutError);
        throw new Error(timeoutError);
      }
      if (error.message.includes('fetch')) {
        const connectionError = 'No se pudo conectar con el servidor. Verifique que el backend esté funcionando.';
        console.error('🌐 SpecialtyService.apiClient - Error de conexión:', connectionError);
        throw new Error(connectionError);
      }
    }
    throw error;
  }
};

/**
 * Servicio para gestionar las especialidades de CIATOB
 */
export const SpecialtyService = {
  /**
   * Obtiene las especialidades de la empresa CIATOB
   */
  fetchSpecialties: async (): Promise<Specialty[]> => {
    console.log('🏥 SpecialtyService.fetchSpecialties - Iniciando búsqueda de especialidades');
    console.log('🏢 SpecialtyService.fetchSpecialties - Company ID:', DEFAULT_COMPANY_ID);
    console.log('🌐 SpecialtyService.fetchSpecialties - API URL base:', API_URL);
    
    try {
      const url = `${API_URL}/business/config/public/specialties/${DEFAULT_COMPANY_ID}`;
      console.log('🔗 SpecialtyService.fetchSpecialties - URL construida:', url);
      
      // Se especifica que esperamos un array de Specialty de la API
      const data = await apiClient<Specialty[]>(url, { method: 'GET' });
      console.log('📥 SpecialtyService.fetchSpecialties - Datos crudos recibidos:', data);
      
      // Filtrar especialidades válidas. El tipo de 'specialty' se infiere correctamente.
      const validSpecialties = data.filter((specialty) => {
        const isValid = specialty && 
          specialty.name && 
          specialty.name.toLowerCase() !== 'multiple' &&
          specialty.name.trim() !== '';
        
        if (!isValid) {
          console.warn('⚠️ SpecialtyService.fetchSpecialties - Especialidad inválida filtrada:', specialty);
        } else {
          console.log('✅ SpecialtyService.fetchSpecialties - Especialidad válida:', specialty);
        }
        
        return isValid;
      });
      
      console.log(`📊 SpecialtyService.fetchSpecialties - Total especialidades válidas: ${validSpecialties.length}`);
      console.log('✅ SpecialtyService.fetchSpecialties - Lista final de especialidades:', validSpecialties);
      
      return validSpecialties;
    } catch (error) {
      console.error('❌ SpecialtyService.fetchSpecialties - Error:', error);
      throw error;
    }
  },

  /**
   * Método de respaldo usando datos mock (solo para desarrollo)
   */
  getMockSpecialties: (): Specialty[] => {
    console.log('🎭 SpecialtyService.getMockSpecialties - Generando datos mock');
    
    const mockSpecialties = [
      { id: 1, name: 'Cardiología' },
      { id: 2, name: 'Dermatología' },
      { id: 3, name: 'Endocrinología' },
      { id: 4, name: 'Ginecología' },
      { id: 5, name: 'Neurología' },
      { id: 6, name: 'Pediatría' },
      { id: 7, name: 'Psiquiatría' },
      { id: 8, name: 'Traumatología' }
    ];
    
    console.log('✅ SpecialtyService.getMockSpecialties - Datos mock generados:', mockSpecialties);
    return mockSpecialties;
  }
};