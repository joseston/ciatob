// src/hooks/useAppointment.ts
import { useDoctors } from './useDoctors';
import { useAppointmentSlots } from './useAppointmentSlots';
import { useSpecialties } from './useSpecialties';
import { Slot } from '../types/appointment';

/**
 * Hook principal que combina la lógica de selección de especialidades, médicos y slots
 */
export const useAppointment = () => {
  const {
    specialties,
    selectedSpecialty,
    loading: loadingSpecialties,
    error: specialtiesError,
    selectSpecialty
  } = useSpecialties();

  const {
    doctors,
    selectedDoctor,
    loading: loadingDoctors,
    error: doctorsError,
    selectDoctor
  } = useDoctors();

  // Filtramos los médicos según la especialidad seleccionada
  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doctor => doctor.specialty?.name === selectedSpecialty.name)
    : [];

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

  const handleSpecialtySelect = (specialtyId: number) => {
    const specialty = specialties.find(s => s.id === specialtyId);
    if (specialty) {
      selectSpecialty(specialtyId);
      // Reseteamos el médico seleccionado cuando cambiamos de especialidad
      if (selectedDoctor) {
        selectDoctor(null);
      }
    }
  };

  const handleDoctorSelect = (doctorId: number) => {
    const doctor = filteredDoctors.find(d => d.id === doctorId);
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

  const handleSlotSelect = (slot: Slot | null) => {  // Modificar aquí para aceptar null
    selectSlot(slot);
  };
  return {
    // Estado
    specialties,
    selectedSpecialty,
    doctors: filteredDoctors,
    selectedDoctor,
    dateRange,
    groupedSlots,
    selectedSlot,
    loading: loadingSpecialties || loadingDoctors || loadingSlots,
    loadingSpecialties,
    loadingDoctors,
    loadingSlots,
    error: specialtiesError || doctorsError || slotsError,
    
    // Acciones
    handleSpecialtySelect,
    handleDoctorSelect,
    handleDateRangeChange,
    handleSlotSelect
  };
};