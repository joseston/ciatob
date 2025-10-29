// src/app/agendar-cita/components/appointment/AppointmentPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppointment } from '../../hooks/useAppointment';
import { useBooking } from '../../hooks/useBooking';
import HorizontalSpecialtySelector from './HorizontalSpecialtySelector';
import DoctorSelector from './DoctorSelector';
import InteractiveCalendar from './InteractiveCalendar';
import DayTimeSlots from './DayTimeSlots';
import AppointmentSummary from './AppointmentSummary';
import BookingModal from './BookingModal';
import BookingSuccess from './BookingSuccess';
import { 
  DoctorSelectorSkeleton, 
  SpecialtySelectorSkeleton 
} from './SkeletonLoader';
import { parseISO, isSameDay } from 'date-fns';
import { TimeSlot } from '../../types/appointment';

const AppointmentPage: React.FC = () => {
  // Estado local para manejar la vista del calendario/horarios
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const {
    specialties,
    selectedSpecialty,
    doctors,
    selectedDoctor,
    dateRange,
    groupedSlots,
    selectedSlot,
    loading,
    loadingSpecialties,
    loadingDoctors,
    loadingSlots,
    handleSpecialtySelect,
    handleDoctorSelect,
    handleSlotSelect
  } = useAppointment();

  // Obtener fechas disponibles del groupedSlots
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    Object.keys(groupedSlots).forEach(dateStr => {
      if (groupedSlots[dateStr].length > 0) {
        dates.push(parseISO(dateStr));
      }
    });
    return dates;
  }, [groupedSlots]);

  // Obtener horarios para la fecha seleccionada
  const selectedDateSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    return groupedSlots[dateStr] || [];
  }, [selectedDate, groupedSlots]);

  // Manejar selección de fecha en el calendario
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
    // Limpiar slot seleccionado cuando cambiamos de fecha
    if (selectedSlot && !isSameDay(parseISO(selectedSlot.fecha), date)) {
      handleSlotSelect(null);
    }
  };

  // Manejar cambio de doctor - resetear fecha y horarios
  const handleDoctorChange = (doctorId: number) => {
    handleDoctorSelect(doctorId);
    // Resetear estados de fecha y horarios cuando cambia el doctor
    setSelectedDate(null);
    setShowTimeSlots(false);
    handleSlotSelect(null);
  };

  // Manejar selección de horario
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    handleSlotSelect(slot);
  };

  const {
    isModalOpen,
    isLoading,
    bookingSuccess,
    errorMessage,
    appointmentData,
    openBookingModal,
    closeBookingModal,
    bookAppointment,
    resetBooking
  } = useBooking({
    doctor: selectedDoctor,
    selectedSlot
  });

  const handleReset = () => {
    resetBooking();
    handleSlotSelect(null);
    setSelectedDate(null);
    setShowTimeSlots(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agenda tu{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                Consulta
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecciona la especialidad y el profesional que mejor se adapte a tus necesidades
            </p>
          </motion.div>

          {/* Selección de especialidad horizontal */}
          {loadingSpecialties ? (
            <SpecialtySelectorSkeleton />
          ) : (
            <HorizontalSpecialtySelector 
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              onSelectSpecialty={handleSpecialtySelect}
            />
          )}

          {/* Layout dinámico basado en el estado de selección */}
          <motion.div 
            layout
            className={`grid gap-6 mb-10 transition-all duration-500 ease-out ${
              showTimeSlots && selectedDate 
                ? 'grid-cols-1 xl:grid-cols-3' // 3 columnas cuando se selecciona día
                : 'grid-cols-1 lg:grid-cols-2'  // 2 columnas por defecto
            }`}
          >
            {/* Columna 1: Selección de Especialista - SIEMPRE VISIBLE */}
            <div className="space-y-6">
              {loadingDoctors || loadingSpecialties ? (
                <DoctorSelectorSkeleton />
              ) : (
                <DoctorSelector 
                  doctors={doctors}
                  selectedDoctor={selectedDoctor}
                  onSelectDoctor={handleDoctorChange}
                  disabled={false}
                />
              )}

              {/* Resumen de la cita - Solo aparece cuando hay slot seleccionado */}
              {selectedDoctor && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AppointmentSummary 
                    selectedDoctor={selectedDoctor}
                    dateRange={dateRange}
                    selectedSlot={selectedSlot}
                  />
                </motion.div>
              )}
            </div>

            {/* Columna 2: Calendario - SIEMPRE VISIBLE cuando hay doctor */}
            <div className="space-y-6">
              <InteractiveCalendar
                selectedDoctor={selectedDoctor}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                availableDates={availableDates}
                loading={loadingSlots}
              />
            </div>

            {/* Columna 3: Horarios - Solo aparece cuando se selecciona un día */}
            <AnimatePresence mode="wait">
              {showTimeSlots && selectedDate && (
                <motion.div
                  key="time-slots"
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    layout: { duration: 0.3 }
                  }}
                  className="space-y-6"
                >
                  <DayTimeSlots
                    selectedDate={selectedDate}
                    timeSlots={selectedDateSlots}
                    selectedSlot={selectedSlot}
                    onSelectSlot={handleTimeSlotSelect}
                    onBack={() => {}}
                    doctor={selectedDoctor}
                    loading={loadingSlots}
                    onContinue={openBookingModal}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Modal de reserva */}
          <BookingModal
            isOpen={isModalOpen}
            onClose={closeBookingModal}
            onSubmit={bookAppointment}
            doctor={selectedDoctor}
            selectedSlot={selectedSlot}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />

          {/* Modal de confirmación de reserva exitosa */}
          <AnimatePresence>
            {bookingSuccess && appointmentData && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <BookingSuccess 
                  appointmentData={appointmentData}
                  onReset={handleReset}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default AppointmentPage;