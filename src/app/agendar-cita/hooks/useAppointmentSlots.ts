// src/hooks/useAppointmentSlots.ts
import { useState, useEffect } from 'react';
import { Slot, GroupedSlots, DateRange } from '../types/appointment';
import { AppointmentService } from '../services/appointment.service';
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
  selectSlot: (slot: Slot) => void;
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
      if (!doctorId) return;

      try {
        setLoading(true);
        const slots = await AppointmentService.fetchAvailableSlots(
          doctorId,
          dateRange.startDate,
          dateRange.endDate
        );
        setGroupedSlots(slots);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido al cargar slots'));
        console.error('Error loading slots:', err);
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

  const selectSlot = (slot: Slot) => {
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