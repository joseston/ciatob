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
    console.log('📬 NotificationService.notifyNewAppointment - Iniciando envío de notificación:', {
      patientName: data.patientName,
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      appointmentId: data.appointmentId
    });

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
        // Números de WhatsApp de CIATOB (configurables)
        recipients: [
          '+51948213270', // WhatsApp principal de CIATOB
          // Se pueden agregar más números aquí
        ]
      };
      
      console.log('📋 NotificationService.notifyNewAppointment - Datos de solicitud preparados:', {
        ...requestBody,
        patient: {
          ...requestBody.patient,
          phone: requestBody.patient.phone.substring(0, 3) + '***',
          dni: requestBody.patient.dni.substring(0, 3) + '***'
        }
      });
      
      const url = `${API_URL}/business/notifications/new_appointment`;
      console.log('🔗 NotificationService.notifyNewAppointment - URL de notificación:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('✅ NotificationService.notifyNewAppointment - Respuesta recibida:', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ NotificationService.notifyNewAppointment - Error en respuesta:', errorData);
        throw new Error(errorData.error || 'Error al enviar notificación');
      }
      
      const result = await response.json();
      console.log('📊 NotificationService.notifyNewAppointment - Respuesta exitosa:', result);
      
      const successResult = {
        success: true,
        message: result.message || 'Notificación enviada',
        notificationId: result.notification_id
      };
      
      console.log('✅ NotificationService.notifyNewAppointment - Notificación enviada exitosamente:', successResult);
      return successResult;
    } catch (error) {
      console.error('❌ NotificationService.notifyNewAppointment - Error enviando notificación:', error);
      
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
    console.log('💬 NotificationService.generateCiatobMessage - Generando mensaje de WhatsApp:', {
      patientName: data.patientName,
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime
    });

    const message = `🩺 *NUEVA SOLICITUD DE CITA - CIATOB*

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

    console.log('✅ NotificationService.generateCiatobMessage - Mensaje generado exitosamente');
    return message;
  },

  /**
   * Método de respaldo: envío directo por WhatsApp Web (si falla la API)
   */
  sendDirectWhatsApp: (data: NotificationData): void => {
    console.log('📱 NotificationService.sendDirectWhatsApp - Enviando mensaje directo por WhatsApp Web');
    
    const message = NotificationService.generateCiatobMessage(data);
    const whatsappUrl = `https://web.whatsapp.com/send?phone=+51948213270&text=${encodeURIComponent(message)}`;
    
    console.log('🔗 NotificationService.sendDirectWhatsApp - URL de WhatsApp generada:', whatsappUrl);
    
    window.open(whatsappUrl, '_blank');
    console.log('✅ NotificationService.sendDirectWhatsApp - Ventana de WhatsApp abierta');
  }
};
