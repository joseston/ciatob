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
    console.log('📅 BookingService.bookAppointment - Iniciando reserva de cita:', {
      companyId,
      doctorId,
      slotId,
      patientData: {
        ...patientData,
        // No mostrar datos sensibles en logs de producción
        dni: patientData.dni.substring(0, 3) + '***',
        telefono: patientData.telefono.substring(0, 3) + '***'
      }
    });

    try {
      const requestData = {
        company_id: companyId,
        company_doctor_id: doctorId,
        cita_id: slotId,
        dni: patientData.dni,
        nombre: patientData.nombre,
        telefono: patientData.telefono,
        email: patientData.email || undefined // No enviar si está vacío
      };
      
      console.log('📋 BookingService.bookAppointment - Datos de solicitud preparados:', {
        ...requestData,
        dni: requestData.dni.substring(0, 3) + '***',
        telefono: requestData.telefono.substring(0, 3) + '***'
      });
      
      const url = `${API_URL}/business/calendar/public/book_appointment`;
      console.log('🔗 BookingService.bookAppointment - URL de reserva:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      console.log('✅ BookingService.bookAppointment - Respuesta recibida:', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ BookingService.bookAppointment - Error en respuesta:', errorData);
        throw new Error(errorData.error || 'Error al realizar la reserva');
      }
      
      const data = await response.json();
      console.log('📊 BookingService.bookAppointment - Datos de respuesta:', data);
      
      // 🚀 NUEVO: Enviar notificación automática a CIATOB
      if (data.appointment) {
        console.log('📬 BookingService.bookAppointment - Enviando notificación a CIATOB');
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
          
          console.log('✅ BookingService.bookAppointment - Notificación enviada exitosamente');
        } catch (notificationError) {
          console.warn('⚠️ BookingService.bookAppointment - Error enviando notificación (la cita se guardó correctamente):', notificationError);
          // No fallar toda la operación si falla la notificación
        }
      } else {
        console.warn('⚠️ BookingService.bookAppointment - No se encontró información de cita en la respuesta para enviar notificación');
      }
      
      const result = {
        success: true,
        message: data.message || 'Cita reservada exitosamente',
        appointment: data.appointment
      };
      
      console.log('✅ BookingService.bookAppointment - Reserva completada exitosamente:', result);
      return result;
    } catch (error) {
      console.error('❌ BookingService.bookAppointment - Error en reserva:', error);
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
    console.log('🔍 BookingService.checkPatientStatus - Verificando estado del paciente:', {
      dni: dni.substring(0, 3) + '***',
      dniLength: dni.length,
      companyId: DEFAULT_COMPANY_ID
    });

    try {
      if (!dni || dni.length < 8) {
        console.warn('⚠️ BookingService.checkPatientStatus - DNI inválido o muy corto:', { dni, length: dni.length });
        return null;
      }
      
      const queryParams = new URLSearchParams({
        company_id: DEFAULT_COMPANY_ID.toString(),
        dni: dni
      });
      
      const url = `${API_URL}/business/calendar/public/check_patient_status?${queryParams}`;
      console.log('🔗 BookingService.checkPatientStatus - URL construida:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('✅ BookingService.checkPatientStatus - Respuesta recibida:', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ BookingService.checkPatientStatus - Error en respuesta:', errorData);
        throw new Error(errorData.error || 'Error al verificar estado del paciente');
      }
      
      const data = await response.json();
      console.log('📊 BookingService.checkPatientStatus - Datos de paciente recibidos:', {
        ...data,
        dni: data.dni ? data.dni.substring(0, 3) + '***' : 'N/A'
      });
      
      return data;
    } catch (error) {
      console.error('❌ BookingService.checkPatientStatus - Error:', error);
      // Retornar nulo en caso de error
      return null;
    }
  }
};