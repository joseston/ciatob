// src/services/appointment.service.ts
import { Doctor, Slot, GroupedSlots } from '../types/appointment';
import { getDoctorsByCompany, getAvailableSlots, DEFAULT_COMPANY_ID } from '@/services/api';
import { format } from 'date-fns';

// Mapeo de especialistas con sus fotos
// Endocrinología
const specialistsImages: Record<string, Record<string, string>> = {
  endocrinologia: {
    "helard manrique": "https://static.scieluxe.com/files/helard-manrique.png",
    "helard andres manrique hurtado": "https://static.scieluxe.com/files/helard-manrique.png",
    "kenlly cardoza": "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
    "kennlly josseph cardoza jimenez": "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
    "katty manrique": "https://static.scieluxe.com/files/katty-manrique.jpg",
    "katty manrique franco": "https://static.scieluxe.com/files/katty-manrique.jpg"
  },
  // Nutrición
  nutricion: {
    "alondra ramirez": "https://static.scieluxe.com/files/alondra-ramirez.webp",
    "valeria vilchez": "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg",
    "valeria vilchez alburquerque": "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg"
  },
  // Psicología
  psicologia: {
    "luciana castro": "https://static.scieluxe.com/files/luciana-castro.jpg",
    "luciana castro cabrera": "https://static.scieluxe.com/files/luciana-castro.jpg"
  }
};

// Función para normalizar nombres y hacer el matching
const normalizeNameForMatching = (name: string): string => {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s]/g, '') // Remover caracteres especiales
    .trim();
};

/**
 * Servicio para gestionar las citas y horarios disponibles
 */
export const AppointmentService = {
  /**
   * Obtiene la lista de médicos disponibles
   */  fetchDoctors: async (): Promise<Doctor[]> => {
    try {
      const doctors = await getDoctorsByCompany(DEFAULT_COMPANY_ID);
      
      // Agregar imágenes a los especialistas según su especialidad
      return doctors.map((doctor: Doctor) => {
        const specialtyName = doctor.specialty?.name?.toLowerCase() || '';
        let category = '';
        
        // Determinar la categoría según la especialidad
        if (specialtyName.includes('endocrin')) {
          category = 'endocrinologia';
        } else if (specialtyName.includes('nutri')) {
          category = 'nutricion';
        } else if (specialtyName.includes('psicolog')) {
          category = 'psicologia';
        }
        
        // Si encontramos una categoría válida, buscamos la imagen
        if (category && specialistsImages[category]) {
          const normalizedName = normalizeNameForMatching(doctor.nombre);
          const image = specialistsImages[category][normalizedName];
          
          if (image) {
            return { ...doctor, image };
          }
        }
        
        return doctor;
      });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },
  
  /**
   * Obtiene los slots disponibles para un médico en un rango de fechas
   */
  fetchAvailableSlots: async (
    doctorId: number,
    startDate: Date,
    endDate: Date
  ): Promise<GroupedSlots> => {
    try {
      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const endDateStr = format(endDate, 'yyyy-MM-dd');
      
      const response = await getAvailableSlots(
        DEFAULT_COMPANY_ID,
        doctorId,
        startDateStr,
        endDateStr
      );
      
      // Agrupar slots por fecha
      return response.slots.reduce((acc: GroupedSlots, slot: Slot) => {
        if (!acc[slot.fecha]) {
          acc[slot.fecha] = [];
        }
        acc[slot.fecha].push(slot);
        return acc;
      }, {});
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw error;
    }
  },
  
  /**
   * Reserva una cita en el slot seleccionado (a implementar)
   */
  bookAppointment: async (
    slotId: number,
    patientData: {
      nombre: string;
      email: string;
      telefono: string;
      // otros campos necesarios
    }
  ) => {
    try {
      // Implementar la lógica para reservar la cita
      // Esta sería una futura implementación que conectaría con el endpoint correspondiente
      console.log('Reservando cita...', { slotId, patientData });
      
      // Simulación de respuesta exitosa
      return {
        success: true,
        message: 'Cita reservada exitosamente',
        appointmentId: Math.floor(Math.random() * 1000) // ID simulado
      };
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error;
    }
  }
};