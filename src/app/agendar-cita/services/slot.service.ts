// src/app/agendar-cita/services/slot.service.ts
import { Slot, GroupedSlots } from '../types/appointment';

// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;

// Interfaz para la respuesta esperada de la API de slots
interface ApiSlotResponse {
  slots: Slot[];
}

// Cliente API reutilizable
const apiClient = async (url: string, options: RequestInit = {}) => {
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
      // No se usa 'errorText', por lo que se elimina la variable
      throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('La petición tardó demasiado tiempo.');
      }
      if (error.message.includes('fetch')) {
        throw new Error('No se pudo conectar con el servidor. Verifique que el backend esté funcionando.');
      }
    }
    throw error;
  }
};

/**
 * Servicio para gestionar los slots disponibles de CIATOB
 */
export const SlotService = {
  /**
   * Obtiene los slots disponibles para un médico en un rango de fechas
   */
  fetchAvailableSlots: async (
    doctorId: number,
    startDate: string,
    endDate: string
  ): Promise<GroupedSlots> => {
    try {
      const queryParams = new URLSearchParams({
        company_id: DEFAULT_COMPANY_ID.toString(),
        doctor_id: doctorId.toString(),
        start_date: startDate,
        end_date: endDate
      });
      
      const url = `${API_URL}/business/calendar/public/available-slots?${queryParams}`;
      // Se utiliza la interfaz ApiSlotResponse para tipar la respuesta
      const response = await apiClient(url, { method: 'GET' }) as ApiSlotResponse;
      
      const groupedSlots: GroupedSlots = {};
      
      if (response.slots && Array.isArray(response.slots)) {
        // El tipo de 'slot' se infiere correctamente como 'Slot'
        response.slots.forEach((slot) => {
          const date = slot.fecha;
          if (!groupedSlots[date]) {
            groupedSlots[date] = [];
          }
          groupedSlots[date].push({
            id: slot.id,
            fecha: slot.fecha,
            hora_inicio: slot.hora_inicio,
            hora_fin: slot.hora_fin,
            duracion: slot.duracion || '30'
          });
        });
      }
      
      return groupedSlots;
    } catch (error) {
      // Se relanza el error para que el hook lo maneje
      throw error;
    }
  },

  /**
   * Método de respaldo usando datos mock
   */
  getMockSlots: (startDate: string, endDate: string): GroupedSlots => {
    const mockSlots: GroupedSlots = {};
    const start = new Date(startDate);
    const end = new Date(endDate);
    let idCounter = 1;
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      
      if (d.getDay() >= 1 && d.getDay() <= 5) {
        mockSlots[dateStr] = [
          { id: idCounter++, fecha: dateStr, hora_inicio: '09:00', hora_fin: '09:30', duracion: '30' },
          { id: idCounter++, fecha: dateStr, hora_inicio: '10:00', hora_fin: '10:30', duracion: '30' },
          { id: idCounter++, fecha: dateStr, hora_inicio: '14:00', hora_fin: '14:30', duracion: '30' }
        ];
      }
    }
    
    return mockSlots;
  }
};