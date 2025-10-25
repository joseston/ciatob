// src/services/appointment.service.ts
import { Doctor, /* Slot, */ GroupedSlots } from '../types/appointment';
import { getDoctorsByCompany, /* getAvailableSlots */ DEFAULT_COMPANY_ID } from '@/services/api';

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

// Log inicial para mostrar las imágenes disponibles


// Función para normalizar nombres y hacer el matching
const normalizeNameForMatching = (name: string): string => {
  
  const normalized = name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s]/g, '') // Remover caracteres especiales
    .trim();
    
  return normalized;
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
      const processedDoctors = doctors.map((doctor: Doctor) => {
        
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
        
        
        
        // Determinar género basado en el nombre o los datos conocidos
        let gender: 'male' | 'female' = 'male';
        const normalizedName = normalizeNameForMatching(doctor.nombre);
        
        
        // Asignar género según los datos conocidos de los especialistas
        if (normalizedName.includes('katty') || 
            normalizedName.includes('guadalupe') || 
            normalizedName.includes('valeria') || 
            normalizedName.includes('alondra') ||
            normalizedName.includes('luciana')) {
          gender = 'female';
        }
        
        
        
        // Si encontramos una categoría válida, buscamos la imagen
        if (category && specialistsImages[category]) {
          const image = specialistsImages[category][normalizedName];
          
          if (image) {
            
            return { ...doctor, image, gender };
          } else {
            console.log('⚠️ AppointmentService.fetchDoctors - No se encontró imagen para el doctor:', { 
              doctorName: doctor.nombre, 
              category, 
              normalizedName 
            });
          }
          
          // Incluso si no tenemos imagen, asignamos el género
          return { ...doctor, gender };
        }
        
        console.log('🔍 AppointmentService.fetchDoctors - No se encontró categoría válida:', { 
          doctorName: doctor.nombre, 
          specialtyName 
        });
        
        return doctor;
      });
      
      console.log('✅ AppointmentService.fetchDoctors - Doctores procesados exitosamente:', processedDoctors);
      return processedDoctors;
    } catch (error) {
      console.error('❌ AppointmentService.fetchDoctors - Error:', error);
      throw error;
    }
  },
    /**
   * Obtiene los slots disponibles para un médico en un rango de fechas
   * (Actualmente devuelve un objeto vacío para usar el sistema de WhatsApp)
   */
  fetchAvailableSlots: async (
    /* doctorId: number,
    startDate: Date,
    endDate: Date */
  ): Promise<GroupedSlots> => {
    console.log('📅 AppointmentService.fetchAvailableSlots - Iniciando búsqueda de slots');
    console.log('⚠️ AppointmentService.fetchAvailableSlots - MODO WHATSAPP: Devolviendo objeto vacío para forzar uso de WhatsApp');
    
    // Devolvemos un objeto vacío para que no se muestren slots
    // y así forzar el uso del botón de WhatsApp
    const emptySlots = {};
    
    console.log('✅ AppointmentService.fetchAvailableSlots - Slots vacíos devueltos:', emptySlots);
    return emptySlots;
    
    /* COMENTADO PARA USO FUTURO
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
    */
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
    console.log('📅 AppointmentService.bookAppointment - Iniciando reserva de cita:', {
      slotId,
      patientData: {
        ...patientData,
        telefono: patientData.telefono.substring(0, 3) + '***',
        email: patientData.email ? patientData.email.substring(0, 3) + '***' : 'N/A'
      }
    });

    try {
      // Implementar la lógica para reservar la cita
      // Esta sería una futura implementación que conectaría con el endpoint correspondiente
      
      console.log('🎭 AppointmentService.bookAppointment - Usando simulación de respuesta');
      
      // Simulación de respuesta exitosa
      const result = {
        success: true,
        message: 'Cita reservada exitosamente',
        appointmentId: Math.floor(Math.random() * 1000) // ID simulado
      };
      
      console.log('✅ AppointmentService.bookAppointment - Reserva simulada exitosa:', result);
      return result;
    } catch (error) {
      console.error('❌ AppointmentService.bookAppointment - Error:', error);
      throw error;
    }
  }
};