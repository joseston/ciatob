// src/app/agendar-cita/hooks/useBooking.ts
import { useState, useCallback } from 'react';
import { DEFAULT_COMPANY_ID } from '@/services/api';
import { BookingService, PatientFormData, AppointmentData } from '../services/booking.service';
import { Doctor, Slot } from '../types/appointment';

interface UseBookingProps {
  doctor: Doctor | null;
  selectedSlot: Slot | null;
}

export const useBooking = ({ doctor, selectedSlot }: UseBookingProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);

  const openBookingModal = useCallback(() => {
    if (!doctor || !selectedSlot) {
      setErrorMessage('Debes seleccionar un médico y un horario');
      return;
    }
    
    setIsModalOpen(true);
    setErrorMessage(null);
  }, [doctor, selectedSlot]);

  const closeBookingModal = useCallback(() => {
    if (!isLoading) {
      setIsModalOpen(false);
      setErrorMessage(null);
    }
  }, [isLoading]);

  const resetBooking = useCallback(() => {
    setBookingSuccess(false);
    setAppointmentData(null);
    setErrorMessage(null);
    setIsModalOpen(false);
  }, []);

  const bookAppointment = useCallback(async (patientData: PatientFormData) => {
    if (!doctor || !selectedSlot) {
      setErrorMessage('Debes seleccionar un médico y un horario');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await BookingService.bookAppointment(
        DEFAULT_COMPANY_ID,
        doctor.id,
        selectedSlot.id,
        patientData
      );

      if (result.success && result.appointment) {
        setBookingSuccess(true);
        setAppointmentData(result.appointment);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al realizar la reserva'
      );
    } finally {
      setIsLoading(false);
    }
  }, [doctor, selectedSlot]);

  const checkPatientStatus = useCallback(async (dni: string) => {
    if (!dni || dni.length < 8) return null;
    
    try {
      return await BookingService.checkPatientStatus(dni);
    } catch (error) {
      console.error('Error checking patient status:', error);
      return null;
    }
  }, []);

  return {
    isModalOpen,
    isLoading,
    bookingSuccess,
    errorMessage,
    appointmentData,
    openBookingModal,
    closeBookingModal,
    bookAppointment,
    checkPatientStatus,
    resetBooking
  };
};