// src/services/appointment.service.ts
import { Doctor, Slot, GroupedSlots } from '../types/appointment';
import { getDoctorsByCompany, getAvailableSlots, DEFAULT_COMPANY_ID } from '@/services/api';
import { format } from 'date-fns';

/**
 * Servicio para gestionar las citas y horarios disponibles
 */
export const AppointmentService = {
  /**
   * Obtiene la lista de médicos disponibles
   */
  fetchDoctors: async (): Promise<Doctor[]> => {
    try {
      return await getDoctorsByCompany(DEFAULT_COMPANY_ID);
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