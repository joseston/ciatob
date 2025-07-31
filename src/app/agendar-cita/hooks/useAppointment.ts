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
  console.log('🔍 useAppointment - Estado actual:', {
    selectedSpecialty,
    totalDoctors: doctors.length,
    doctorsWithSpecialties: doctors.map(d => ({
      id: d.id,
      nombre: d.nombre,
      specialtyId: d.specialty?.id,
      specialtyName: d.specialty?.name
    }))
  });

  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doctor => {
        const match = doctor.specialty?.id === selectedSpecialty.id;
        console.log(`👨‍⚕️ useAppointment - Filtro doctor ${doctor.nombre}:`, {
          doctorSpecialtyId: doctor.specialty?.id,
          doctorSpecialtyName: doctor.specialty?.name,
          selectedSpecialtyId: selectedSpecialty.id,
          selectedSpecialtyName: selectedSpecialty.name,
          match
        });
        return match;
      })
    : [];

  console.log('✅ useAppointment - Doctores filtrados:', {
    selectedSpecialtyId: selectedSpecialty?.id,
    selectedSpecialtyName: selectedSpecialty?.name,
    filteredCount: filteredDoctors.length,
    filteredDoctors: filteredDoctors.map(d => ({
      id: d.id,
      nombre: d.nombre,
      specialtyName: d.specialty?.name
    }))
  });

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