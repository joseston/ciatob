
// src/app/agendar-cita/services/booking.service.ts
import { API_URL, DEFAULT_COMPANY_ID } from '@/services/api';
import { NotificationService } from './notification.service';

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
      const requestData = {
        company_id: companyId,
        company_doctor_id: doctorId,
        cita_id: slotId,
        dni: patientData.dni,
        nombre: patientData.nombre,
        telefono: patientData.telefono,
        email: patientData.email || undefined
      };

      const url = `${API_URL}/business/calendar/public/book_appointment`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al realizar la reserva');
      }

      const data = await response.json();

      if (data.appointment) {
        try {
          await NotificationService.notifyNewAppointment({
            patientName: patientData.nombre,
            patientPhone: patientData.telefono,
            patientDni: patientData.dni,
            doctorName: data.appointment.doctor.nombre,
            specialty: data.appointment.doctor.specialty,
            appointmentDate: data.appointment.fecha,
            appointmentTime: `${data.appointment.hora_inicio} - ${data.appointment.hora_fin}`,
            appointmentId: data.appointment.id
          });
        } catch {
          // No fallar toda la operación si falla la notificación
        }
      }

      return {
        success: true,
        message: data.message || 'Cita reservada exitosamente',
        appointment: data.appointment
      };
    } catch (error) {
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
      if (!dni || dni.length < 8) {
        return null;
      }

      const queryParams = new URLSearchParams({
        company_id: DEFAULT_COMPANY_ID.toString(),
        dni: dni
      });

      const url = `${API_URL}/business/calendar/public/check_patient_status?${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al verificar estado del paciente');
      }

      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  }
};