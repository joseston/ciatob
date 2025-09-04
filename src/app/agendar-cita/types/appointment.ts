// src/types/appointment.ts

export interface Specialty {
    id: number;
    name: string;
  }
  
  export interface Doctor {
    id: number;
    nombre: string;
    // CORRECCIÓN: Se añade '| null' para que el tipo sea compatible
    // con los datos procesados desde la API.
    specialty?: {
      id?: number;
      name: string;
    } | null; 
    image?: string;
    gender?: 'male' | 'female';
    profession?: string;
    cmp_id?: string;
    role?: string;
  }
    
  export interface Slot {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    duracion: string;
  }

  // Alias for TimeSlot to maintain compatibility
  export type TimeSlot = Slot;
    
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