// src/hooks/useAppointment.ts
import { useDoctors } from './useDoctors';
import { useAppointmentSlots } from './useAppointmentSlots';
import { Slot, DateRange } from '../types/appointment';

/**
 * Hook principal que combina la lógica de selección de médicos y slots
 */
export const useAppointment = () => {
  const {
    doctors,
    selectedDoctor,
    loading: loadingDoctors,
    error: doctorsError,
    selectDoctor
  } = useDoctors();

  const {
    dateRange,
    groupedSlots,
    selectedSlot,
    loading: loadingSlots,
    error: slotsError,
    setDateRange,
    selectSlot
  } = useAppointmentSlots({
    doctorId: selectedDoctor?.id || null
  });

  const handleDoctorSelect = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      selectDoctor(doctor);
    }
  };

  const handleDateRangeChange = (type: 'start' | 'end', date: Date) => {
    setDateRange({
      ...dateRange,
      [type === 'start' ? 'startDate' : 'endDate']: date
    });
  };

  const handleSlotSelect = (slot: Slot) => {
    selectSlot(slot);
  };

  return {
    // Estado
    doctors,
    selectedDoctor,
    dateRange,
    groupedSlots,
    selectedSlot,
    loading: loadingDoctors || loadingSlots,
    error: doctorsError || slotsError,
    
    // Acciones
    handleDoctorSelect,
    handleDateRangeChange,
    handleSlotSelect
  };
};