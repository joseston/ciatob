// src/app/empresas/types/empresa.types.ts
// src/app/empresas/types/empresa.types.ts

export interface PaqueteEmpresarial {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  duracion: string;
  participantes: string;
  servicios: string[];
  destacado?: boolean;
  tipo: 'basico' | 'integral' | 'premium';
}

export interface ServicioCorporativo {
  id: string;
  nombre: string;
  descripcion: string;
  especialidad: 'endocrinologia' | 'nutricion' | 'psicologia' | 'ejercicio';
  icono: string;
  beneficios: string[];
  duracion: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
}

export interface CasoExito {
  id: string;
  empresaNombre: string;
  sector: string;
  empleados: number;
  problema: string;
  solucion: string;
  resultados: string[];
  testimonial: {
    nombre: string;
    cargo: string;
    comentario: string;
  };
  metricas: {
    ausentismo?: string;
    satisfaccion?: string;
    productividad?: string;
  };
}

export interface ContactoEmpresarial {
  nombreEmpresa: string;
  nombreContacto: string;
  cargo: string;
  email: string;
  telefono: string;
  empleados: string;
  sector: string;
  necesidades: string[];
  mensaje?: string;
  paqueteInteres?: string;
}

export interface ProcesoStep {
  numero: number;
  titulo: string;
  descripcion: string;
  duracion: string;
  icono: string;
}

export type TamanoEmpresa = 'pequena' | 'mediana' | 'grande';
export type SectorEmpresa = 'tecnologia' | 'finanzas' | 'salud' | 'educacion' | 'manufactura' | 'servicios' | 'otro';