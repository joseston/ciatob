// src/hooks/useAppointmentSlots.ts
import { useState, useEffect } from 'react';
import { Slot, GroupedSlots, DateRange } from '../types/appointment';
import { SlotService } from '../services/slot.service';
import { addDays, format } from 'date-fns';

interface UseAppointmentSlotsProps {
  doctorId: number | null;
  allowMock: boolean;
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
export const useAppointmentSlots = ({ doctorId, allowMock }: UseAppointmentSlotsProps): UseAppointmentSlotsReturn => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: addDays(new Date(), 90), // Extender a 3 meses para el calendario
  });
  const [groupedSlots, setGroupedSlots] = useState<GroupedSlots>({});
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedDoctorId, setLoadedDoctorId] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    const fetchSlots = async () => {
      if (!doctorId) {
        setLoading(false);
        setLoadedDoctorId(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const startDate = format(dateRange.startDate, 'yyyy-MM-dd');
        const endDate = format(dateRange.endDate, 'yyyy-MM-dd');
        
        // Intentar obtener datos del backend
        const slots = await SlotService.fetchAvailableSlots(doctorId, startDate, endDate);
        if (active) setGroupedSlots(slots);
        
      } catch (err) {
        if (!active) return;
        if (allowMock) {
          const startDate = format(dateRange.startDate, 'yyyy-MM-dd');
          const endDate = format(dateRange.endDate, 'yyyy-MM-dd');
          setGroupedSlots(SlotService.getMockSlots(startDate, endDate));
        }
        
        setError(err instanceof Error ? err : new Error('Error al cargar slots del servidor'));
      } finally {
        if (active) {
          setLoadedDoctorId(doctorId);
          setLoading(false);
        }
      }
    };

    // Reset selected slot when doctor changes
    setSelectedSlot(null);
    setGroupedSlots({});
    
    fetchSlots();
    return () => { active = false; };
  }, [doctorId, dateRange, allowMock]);

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
    loading: loading || doctorId !== loadedDoctorId,
    error,
    setDateRange: updateDateRange,
    selectSlot
  };
};
