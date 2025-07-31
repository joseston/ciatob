// src/app/agendar-cita/services/specialty.service.ts
import { Specialty } from '../types/appointment';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Cliente API genérico y reutilizable
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
 * Servicio para gestionar las especialidades de CIATOB
 */
export const SpecialtyService = {
  /**
   * Obtiene las especialidades de la empresa CIATOB
   */
  fetchSpecialties: async (): Promise<Specialty[]> => {
    try {
      const url = `${API_URL}/business/config/public/specialties/${DEFAULT_COMPANY_ID}`;
      // Se especifica que esperamos un array de Specialty de la API
      const data = await apiClient<Specialty[]>(url, { method: 'GET' });
      
      // Filtrar especialidades válidas. El tipo de 'specialty' se infiere correctamente.
      const validSpecialties = data.filter((specialty) => 
        specialty && 
        specialty.name && 
        specialty.name.toLowerCase() !== 'multiple' &&
        specialty.name.trim() !== ''
      );
      
      return validSpecialties;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Método de respaldo usando datos mock (solo para desarrollo)
   */
  getMockSpecialties: (): Specialty[] => {
    return [
      { id: 1, name: 'Cardiología' },
      { id: 2, name: 'Dermatología' },
      { id: 3, name: 'Endocrinología' },
      { id: 4, name: 'Ginecología' },
      { id: 5, name: 'Neurología' },
      { id: 6, name: 'Pediatría' },
      { id: 7, name: 'Psiquiatría' },
      { id: 8, name: 'Traumatología' }
    ];
  }
};