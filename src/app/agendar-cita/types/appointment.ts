// src/types/appointment.ts

export interface Specialty {
    id: number;
    name: string;
  }
  
  export interface Doctor {
    id: number;
    nombre: string;
    specialty?: {
      name: string;
    };
  }
    
  export interface Slot {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    duracion: string;
  }
    
  export interface GroupedSlots {
    [key: string]: Slot[];
  }
    
  export interface DateRange {
    startDate: Date;
    endDate: Date;
  }
    
  export interface AppointmentState {
    specialties: Specialty[];
    selectedSpecialty: Specialty | null;
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    dateRange: DateRange;
    groupedSlots: GroupedSlots;
    selectedSlot: Slot | null;
    loading: boolean;
  }