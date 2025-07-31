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
  console.log('🔄 SlotService.apiClient - Iniciando petición:', { url, options });
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    console.log('📡 SlotService.apiClient - Enviando fetch a:', url);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);
    console.log('✅ SlotService.apiClient - Respuesta recibida:', { 
      status: response.status, 
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorMessage = `Error del servidor: ${response.status} - ${response.statusText}`;
      console.error('❌ SlotService.apiClient - Error en respuesta:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('📊 SlotService.apiClient - Datos recibidos:', data);
    return data;
  } catch (error) {
    console.error('❌ SlotService.apiClient - Error en petición:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        const timeoutError = 'La petición tardó demasiado tiempo.';
        console.error('⏰ SlotService.apiClient - Timeout:', timeoutError);
        throw new Error(timeoutError);
      }
      if (error.message.includes('fetch')) {
        const connectionError = 'No se pudo conectar con el servidor. Verifique que el backend esté funcionando.';
        console.error('🌐 SlotService.apiClient - Error de conexión:', connectionError);
        throw new Error(connectionError);
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
    console.log('🏥 SlotService.fetchAvailableSlots - Iniciando búsqueda de slots:', {
      doctorId,
      startDate,
      endDate,
      companyId: DEFAULT_COMPANY_ID
    });

    try {
      const queryParams = new URLSearchParams({
        company_id: DEFAULT_COMPANY_ID.toString(),
        doctor_id: doctorId.toString(),
        start_date: startDate,
        end_date: endDate
      });
      
      const url = `${API_URL}/business/calendar/public/available-slots?${queryParams}`;
      console.log('🔗 SlotService.fetchAvailableSlots - URL construida:', url);
      
      // Se utiliza la interfaz ApiSlotResponse para tipar la respuesta
      const response = await apiClient(url, { method: 'GET' }) as ApiSlotResponse;
      console.log('📥 SlotService.fetchAvailableSlots - Respuesta de API:', response);
      
      const groupedSlots: GroupedSlots = {};
      
      if (response.slots && Array.isArray(response.slots)) {
        console.log(`📅 SlotService.fetchAvailableSlots - Procesando ${response.slots.length} slots`);
        
        // El tipo de 'slot' se infiere correctamente como 'Slot'
        response.slots.forEach((slot, index) => {
          console.log(`📍 SlotService.fetchAvailableSlots - Procesando slot ${index + 1}:`, slot);
          
          const date = slot.fecha;
          if (!groupedSlots[date]) {
            groupedSlots[date] = [];
            console.log(`📆 SlotService.fetchAvailableSlots - Nueva fecha creada: ${date}`);
          }
          groupedSlots[date].push({
            id: slot.id,
            fecha: slot.fecha,
            hora_inicio: slot.hora_inicio,
            hora_fin: slot.hora_fin,
            duracion: slot.duracion || '30'
          });
        });
        
        console.log('✅ SlotService.fetchAvailableSlots - Slots agrupados exitosamente:', groupedSlots);
      } else {
        console.warn('⚠️ SlotService.fetchAvailableSlots - No se encontraron slots o formato inválido:', response);
      }
      
      return groupedSlots;
    } catch (error) {
      console.error('❌ SlotService.fetchAvailableSlots - Error:', error);
      // Se relanza el error para que el hook lo maneje
      throw error;
    }
  },

  /**
   * Método de respaldo usando datos mock
   */
  getMockSlots: (startDate: string, endDate: string): GroupedSlots => {
    console.log('🎭 SlotService.getMockSlots - Generando datos mock:', { startDate, endDate });
    
    const mockSlots: GroupedSlots = {};
    const start = new Date(startDate);
    const end = new Date(endDate);
    let idCounter = 1;
    
    console.log('📊 SlotService.getMockSlots - Rango de fechas:', { start, end });
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      
      if (d.getDay() >= 1 && d.getDay() <= 5) {
        console.log(`📅 SlotService.getMockSlots - Agregando slots para fecha laboral: ${dateStr}`);
        mockSlots[dateStr] = [
          { id: idCounter++, fecha: dateStr, hora_inicio: '09:00', hora_fin: '09:30', duracion: '30' },
          { id: idCounter++, fecha: dateStr, hora_inicio: '10:00', hora_fin: '10:30', duracion: '30' },
          { id: idCounter++, fecha: dateStr, hora_inicio: '14:00', hora_fin: '14:30', duracion: '30' }
        ];
      } else {
        console.log(`🚫 SlotService.getMockSlots - Saltando fin de semana: ${dateStr}`);
      }
    }
    
    console.log('✅ SlotService.getMockSlots - Datos mock generados:', mockSlots);
    return mockSlots;
  }
};