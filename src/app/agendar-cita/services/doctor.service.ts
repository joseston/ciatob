// src/app/agendar-cita/services/doctor.service.ts
import { Doctor } from '../types/appointment';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Mapeo de nombres de doctores de producción con sus imágenes
const DOCTOR_IMAGES: Record<string, string> = {
  'HELARD ANDRES MANRIQUE HURTADO': 'https://static.scieluxe.com/files/helard-manrique.png',
  'KATTY MANRIQUE FRANCO': 'https://static.scieluxe.com/files/katty-manrique.jpg',
  'KENNLLY JOSSEPH CARDOZA JIMENEZ': 'https://static.scieluxe.com/files/kenlly-cardoza.JPG',
  'LUCIANA CASTRO CABRERA': 'https://static.scieluxe.com/files/luciana-castro.jpg',
  'VALERIA VILCHEZ ALBURQUERQUE': 'https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg',
  // Variaciones de nombres que podrían aparecer
  'GUADALUPE RUIZ HUARANGA': 'https://static.scieluxe.com/files/guadalupe-ruiz.JPG',
  'ALONDRA RAMIREZ': 'https://static.scieluxe.com/files/alondra-ramirez.webp',
  'ALEXANDER FERNANDEZ': 'https://static.scieluxe.com/files/alexander-fernandez.JPG'
};

// Función helper para obtener la imagen del doctor basada en el nombre
const getDoctorImage = (nombre: string): string | undefined => {
  // Primero intentamos con el nombre exacto
  if (DOCTOR_IMAGES[nombre]) {
    return DOCTOR_IMAGES[nombre];
  }
  
  // Si no encontramos exacto, intentamos con variaciones comunes
  const upperName = nombre.toUpperCase().trim();
  if (DOCTOR_IMAGES[upperName]) {
    return DOCTOR_IMAGES[upperName];
  }
  
  // Búsqueda parcial para casos donde el backend tenga nombres ligeramente diferentes
  for (const [key, value] of Object.entries(DOCTOR_IMAGES)) {
    if (key.includes(upperName) || upperName.includes(key)) {
      return value;
    }
  }
  
  return undefined;
};

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
      const errorMessage = `Error del servidor: ${response.status} - ${response.statusText}`;
      console.error('❌ DoctorService.apiClient - Error en respuesta:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    // Se devuelve la respuesta JSON, convertida al tipo genérico T
    return data as T;
  } catch (error) {
    console.error('❌ DoctorService.apiClient - Error en petición:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        const timeoutError = 'La petición tardó demasiado tiempo.';
        console.error('⏰ DoctorService.apiClient - Timeout:', timeoutError);
        throw new Error(timeoutError);
      }
      if (error.message.includes('fetch')) {
        const connectionError = 'No se pudo conectar con el servidor. Verifique que el backend esté funcionando.';
        console.error('🌐 DoctorService.apiClient - Error de conexión:', connectionError);
        throw new Error(connectionError);
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
      
      const validDoctors: Doctor[] = data.filter((doctor) => {
        const isValid = doctor && 
          doctor.id && 
          doctor.nombre && 
          doctor.status === true;
        
        if (!isValid) {
          console.warn('⚠️ DoctorService.fetchDoctors - Doctor inválido filtrado:', doctor);
        }
        
        return isValid;
      }).map((doctor) => {
        
        // Obtener la imagen basada en el nombre del doctor
        const doctorImage = getDoctorImage(doctor.nombre);
        
        const mappedDoctor: Doctor = {
          id: doctor.id,
          nombre: doctor.nombre,
          profession: doctor.profession || 'medico',
          cmp_id: doctor.cmp_id,
          role: doctor.role,
          image: doctorImage, // Agregamos la imagen al doctor
          specialty: doctor.specialty ? {
            id: doctor.specialty.id,
            name: doctor.specialty.name
          } : null
        };
        
        return mappedDoctor;
      });
      

      
      return validDoctors;
    } catch (error) {
      console.error('❌ DoctorService.fetchDoctors - Error:', error);
      throw error;
    }
  },

  /**
   * Obtiene doctores filtrados por especialidad
   */
  fetchDoctorsBySpecialty: async (specialtyId: number): Promise<Doctor[]> => {
    
    try {
      const allDoctors = await DoctorService.fetchDoctors();
      
      const filteredDoctors = allDoctors.filter(doctor => {
        const hasSpecialty = doctor.specialty && doctor.specialty.id === specialtyId;
        
        return hasSpecialty;
      });
      
      return filteredDoctors;
    } catch (error) {
      console.error('❌ DoctorService.fetchDoctorsBySpecialty - Error:', error);
      throw error;
    }
  },

  /**
   * Método de respaldo usando datos mock
   */
  getMockDoctors: (): Doctor[] => {
    
    const mockDoctors = [
      {
        id: 1,
        nombre: 'HELARD ANDRES MANRIQUE HURTADO',
        profession: 'medico',
        cmp_id: '12345',
        role: 'contratado',
        image: 'https://static.scieluxe.com/files/helard-manrique.png',
        specialty: { id: 1, name: 'Endocrinología' }
      },
      {
        id: 2,
        nombre: 'VALERIA VILCHEZ ALBURQUERQUE',
        profession: 'medico',
        cmp_id: '67890',
        role: 'contratado',
        image: 'https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg',
        specialty: { id: 2, name: 'Nutrición' }
      }
    ];
    
    return mockDoctors;
  }
};