// src/app/agendar-cita/components/appointment/AppointmentPage.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppointment } from '../../hooks/useAppointment';
import { useBooking } from '../../hooks/useBooking';
import Header from '@/components/header/header';
import SpecialtySelector from './SpecialtySelector';
import DoctorSelector from './DoctorSelector';
import DateRangeSelector from './DateRangeSelector';
import AppointmentSummary from './AppointmentSummary';
import TimeSlotSelector from './TimeSlotSelector';
import AppointmentButton from './AppointmentButton';
import BookingModal from './BookingModal';
import BookingSuccess from './BookingSuccess';

const AppointmentPage: React.FC = () => {
  const {
    specialties,
    selectedSpecialty,
    doctors,
    selectedDoctor,
    dateRange,
    groupedSlots,
    selectedSlot,
    loading,
    handleSpecialtySelect,
    handleDoctorSelect,
    handleDateRangeChange,
    handleSlotSelect
  } = useAppointment();

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

  const handleSearch = () => {
    // La búsqueda se dispara automáticamente cuando cambia el rango de fechas
    console.log('Búsqueda iniciada manualmente');
  };

  const handleReset = () => {
    resetBooking();
    handleSlotSelect(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Selección de especialidad */}
            <SpecialtySelector 
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              onSelectSpecialty={handleSpecialtySelect}
            />

            {/* Selección de médico */}
            <DoctorSelector 
              doctors={doctors}
              selectedDoctor={selectedDoctor}
              onSelectDoctor={handleDoctorSelect}
              disabled={!selectedSpecialty}
            />

            {/* Resumen de selección */}
            <AppointmentSummary 
              selectedDoctor={selectedDoctor}
              dateRange={dateRange}
              selectedSlot={selectedSlot}
            />
          </div>

          {/* Selección de fecha y hora - Solo se muestra si hay un doctor seleccionado */}
          {selectedDoctor && (
            <>
              <div className="mb-10">
                <DateRangeSelector 
                  dateRange={dateRange}
                  onDateChange={handleDateRangeChange}
                  disabled={!selectedDoctor}
                  onSearch={handleSearch}
                />
              </div>

              <TimeSlotSelector 
                groupedSlots={groupedSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSlotSelect}
                loading={loading}
                doctorSelected={!!selectedDoctor}
              />
            </>
          )}

          {/* Botón para continuar */}
          <AppointmentButton 
            onContinue={openBookingModal}
            disabled={!selectedSlot}
          />

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