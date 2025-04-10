// src/app/servicios/types/service.types.ts

import { LucideIcon } from 'lucide-react';

export interface Service {
  id: number;
  nombre: string;
  descripcion: string;
  costo: number;
  categoria: 'consulta' | 'terapia' | 'chequeo' | 'plan';
  duracion: string; // Ej: "45 min"
  icono?: LucideIcon;
  disponibilidad?: string;
  destacado?: boolean;
}

export type ServiceCategory = 'todos' | 'consulta' | 'terapia' | 'chequeo' | 'plan';