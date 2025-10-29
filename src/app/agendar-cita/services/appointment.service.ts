// src/services/appointment.service.ts
import { Doctor, /* Slot, */ GroupedSlots } from '../types/appointment';
import { getDoctorsByCompany, /* getAvailableSlots */ DEFAULT_COMPANY_ID } from '@/services/api';

const specialistsImages: Record<string, Record<string, string>> = {
  endocrinologia: {
    "helard manrique": "https://static.scieluxe.com/files/helard-manrique.png",
    "helard andres manrique hurtado": "https://static.scieluxe.com/files/helard-manrique.png",
    "kenlly cardoza": "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
    "kennlly josseph cardoza jimenez": "https://static.scieluxe.com/files/kenlly-cardoza.JPG",
    "katty manrique": "https://static.scieluxe.com/files/katty-manrique.jpg",
    "katty manrique franco": "https://static.scieluxe.com/files/katty-manrique.jpg"
  },
  nutricion: {
    "alondra ramirez": "https://static.scieluxe.com/files/alondra-ramirez.webp",
    "valeria vilchez": "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg",
    "valeria vilchez alburquerque": "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg"
  },
  psicologia: {
    "luciana castro": "https://static.scieluxe.com/files/luciana-castro.jpg",
    "luciana castro cabrera": "https://static.scieluxe.com/files/luciana-castro.jpg"
  }
};

const normalizeNameForMatching = (name: string): string => {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .trim();
};

/**
 * Servicio para gestionar las citas y horarios disponibles
 */
export const AppointmentService = {
  /**
   * Obtiene la lista de médicos disponibles
   */
  fetchDoctors: async (): Promise<Doctor[]> => {
    try {
      const doctors = await getDoctorsByCompany(DEFAULT_COMPANY_ID);

      const processedDoctors = doctors.map((doctor: Doctor) => {
        const specialtyName = doctor.specialty?.name?.toLowerCase() || '';
        let category = '';

        if (specialtyName.includes('endocrin')) {
          category = 'endocrinologia';
        } else if (specialtyName.includes('nutri')) {
          category = 'nutricion';
        } else if (specialtyName.includes('psicolog')) {
          category = 'psicologia';
        }

        let gender: 'male' | 'female' = 'male';
        const normalizedName = normalizeNameForMatching(doctor.nombre);

        if (normalizedName.includes('katty') ||
            normalizedName.includes('guadalupe') ||
            normalizedName.includes('valeria') ||
            normalizedName.includes('alondra') ||
            normalizedName.includes('luciana')) {
          gender = 'female';
        }

        if (category && specialistsImages[category]) {
          const image = specialistsImages[category][normalizedName];

          if (image) {
            return { ...doctor, image, gender };
          }

          return { ...doctor, gender };
        }

        return doctor;
      });

      return processedDoctors;
    } catch (error) {
      throw error;
    }
  },
  /**
   * Obtiene los slots disponibles para un médico en un rango de fechas
   * (Actualmente devuelve un objeto vacío para usar el sistema de WhatsApp)
   */
  fetchAvailableSlots: async (): Promise<GroupedSlots> => {
    return {};
  },
  
  /**
   * Reserva una cita en el slot seleccionado (a implementar)
   */
  bookAppointment: async (
   /*  slotId: number, */
    /* patientData: {
      nombre: string;
      email: string;
      telefono: string;
    } */
  ) => {
    try {
      return {
        success: true,
        message: 'Cita reservada exitosamente',
        appointmentId: Math.floor(Math.random() * 1000)
      };
    } catch (error) {
      throw error;
    }
  }
};