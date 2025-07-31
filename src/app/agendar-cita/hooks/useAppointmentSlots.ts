// src/hooks/useAppointmentSlots.ts
import { useState, useEffect } from 'react';
import { Slot, GroupedSlots, DateRange } from '../types/appointment';
import { SlotService } from '../services/slot.service';
import { addDays } from 'date-fns';

interface UseAppointmentSlotsProps {
  doctorId: number | null;
}

interface UseAppointmentSlotsReturn {
  dateRange: DateRange;
  groupedSlots: GroupedSlots;
  selectedSlot: Slot | null;
  loading: boolean;
  error: Error | null;
  setDateRange: (range: DateRange) => void;
  selectSlot: (slot: Slot | null) => void;
}

/**
 * Hook para gestionar los slots disponibles para un médico
 */
export const useAppointmentSlots = ({ doctorId }: UseAppointmentSlotsProps): UseAppointmentSlotsReturn => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: addDays(new Date(), 14), // Por defecto 2 semanas
  });
  const [groupedSlots, setGroupedSlots] = useState<GroupedSlots>({});
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!doctorId) {
        setGroupedSlots({});
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const startDate = dateRange.startDate.toISOString().split('T')[0];
        const endDate = dateRange.endDate.toISOString().split('T')[0];
        
        // Intentar obtener datos del backend
        const slots = await SlotService.fetchAvailableSlots(doctorId, startDate, endDate);
        setGroupedSlots(slots);
        
      } catch (err) {
        // Si falla el backend, usar datos mock
        const startDate = dateRange.startDate.toISOString().split('T')[0];
        const endDate = dateRange.endDate.toISOString().split('T')[0];
        const mockSlots = SlotService.getMockSlots(startDate, endDate);
        setGroupedSlots(mockSlots);
        
        setError(err instanceof Error ? err : new Error('Error al cargar slots del servidor'));
      } finally {
        setLoading(false);
      }
    };

    // Reset selected slot when doctor changes
    setSelectedSlot(null);
    
    fetchSlots();
  }, [doctorId, dateRange]);

  const updateDateRange = (range: DateRange) => {
    setDateRange(range);
    setSelectedSlot(null);
  };

  const selectSlot = (slot: Slot | null) => {
    setSelectedSlot(slot);
  };

  return {
    dateRange,
    groupedSlots,
    selectedSlot,
    loading,
    error,
    setDateRange: updateDateRange,
    selectSlot
  };
};