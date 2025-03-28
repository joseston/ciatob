// src/types/appointment.ts

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
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    dateRange: DateRange;
    groupedSlots: GroupedSlots;
    selectedSlot: Slot | null;
    loading: boolean;
  }