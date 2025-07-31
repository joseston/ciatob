// src/app/agendar-cita/services/index.ts
// Exportaciones centralizadas de todos los servicios de agendar-cita

export { SpecialtyService } from './specialty.service';
export { DoctorService } from './doctor.service';
export { SlotService } from './slot.service';
export { BookingService } from './booking.service';

// Re-exportar tipos si es necesario
export type { PatientFormData, AppointmentData, BookingResponse, PatientStatusResponse } from './booking.service';
