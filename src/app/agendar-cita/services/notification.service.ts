// src/app/agendar-cita/services/notification.service.ts
import { API_URL } from '@/services/api';

export interface NotificationData {
  patientName: string;
  patientPhone: string;
  patientDni: string;
  doctorName: string;
  specialty?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentId: number;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  notificationId?: string;
}

/**
 * Servicio para enviar notificaciones de citas a CIATOB
 */
export const NotificationService = {
  /**
   * Notifica a CIATOB sobre una nueva solicitud de cita
   */
  notifyNewAppointment: async (data: NotificationData): Promise<NotificationResponse> => {
    try {
      const requestBody = {
        type: 'NEW_APPOINTMENT_REQUEST',
        patient: {
          name: data.patientName,
          phone: data.patientPhone,
          dni: data.patientDni
        },
        appointment: {
          id: data.appointmentId,
          doctor_name: data.doctorName,
          specialty: data.specialty,
          date: data.appointmentDate,
          time: data.appointmentTime
        },
        recipients: [
          '+51948213270',
        ]
      };

      const url = `${API_URL}/business/notifications/new_appointment`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar notificación');
      }

      const result = await response.json();

      return {
        success: true,
        message: result.message || 'Notificación enviada',
        notificationId: result.notification_id
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido al enviar notificación'
      };
    }
  },

  /**
   * Genera el mensaje de WhatsApp para CIATOB
   */
  generateCiatobMessage: (data: NotificationData): string => {
    return `🩺 *NUEVA SOLICITUD DE CITA - CIATOB*

📋 *Datos del Paciente:*
• Nombre: ${data.patientName}
• DNI: ${data.patientDni}
• WhatsApp: +51${data.patientPhone}

👩‍⚕️ *Cita Solicitada:*
• Doctor: ${data.doctorName}
• Especialidad: ${data.specialty || 'No especificada'}
• Fecha: ${data.appointmentDate}
• Hora: ${data.appointmentTime}

🔢 *ID de Cita:* ${data.appointmentId}

⚡ *Siguiente Paso:*
Contactar al paciente por WhatsApp para:
1. Confirmar disponibilidad
2. Coordinar el pago de la consulta
3. Enviar detalles finales de la cita

💚 _El paciente está esperando confirmación_`;
  },

  /**
   * Método de respaldo: envío directo por WhatsApp Web (si falla la API)
   */
  sendDirectWhatsApp: (data: NotificationData): void => {
    const message = NotificationService.generateCiatobMessage(data);
    const whatsappUrl = `https://web.whatsapp.com/send?phone=+51948213270&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
};
