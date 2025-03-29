// src/app/agendar-cita/services/booking.service.ts
import { API_URL, DEFAULT_COMPANY_ID } from '@/services/api';

export interface PatientFormData {
  dni: string;
  nombre: string;
  telefono: string;
  email?: string;
  acceptTerms: boolean;
}

export interface AppointmentData {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  patient_status?: string;
  doctor: {
    nombre: string;
    specialty?: string;
  };
  company?: {
    id: number;
    business_name: string;
  };
}

export interface BookingResponse {
  success: boolean;
  message: string;
  appointment?: AppointmentData;
}

export interface PatientStatusResponse {
  dni: string;
  status: 'NEW' | 'RETURNING';
  nombre?: string;
  telefono?: string;
  email?: string;
  last_visit?: string;
}

export const BookingService = {
  /**
   * Reserva una cita con los datos del paciente
   */
  bookAppointment: async (
    companyId: number,
    doctorId: number,
    slotId: number,
    patientData: PatientFormData
  ): Promise<BookingResponse> => {
    try {
      const response = await fetch(`${API_URL}/business/calendar/public/book_appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: companyId,
          company_doctor_id: doctorId,
          cita_id: slotId,
          dni: patientData.dni,
          nombre: patientData.nombre,
          telefono: patientData.telefono,
          email: patientData.email || undefined // No enviar si está vacío
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al realizar la reserva');
      }
      
      const data = await response.json();
      
      return {
        success: true,
        message: data.message || 'Cita reservada exitosamente',
        appointment: data.appointment
      };
    } catch (error) {
      console.error('Error booking appointment:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido al reservar cita'
      };
    }
  },
  
  /**
   * Verifica si un paciente ya existe por su DNI
   */
  checkPatientStatus: async (dni: string): Promise<PatientStatusResponse | null> => {
    try {
      if (!dni || dni.length < 8) return null;
      
      const queryParams = new URLSearchParams({
        company_id: DEFAULT_COMPANY_ID.toString(),
        dni: dni
      });
      
      const response = await fetch(
        `${API_URL}/business/calendar/public/check_patient_status?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al verificar estado del paciente');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error checking patient status:', error);
      // Retornar nulo en caso de error
      return null;
    }
  }
};