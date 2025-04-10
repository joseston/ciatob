// src/app/servicios/services/service.service.ts
import { Service, ServiceCategory } from '../types/service.types';
import { 
  Stethoscope, 
  Apple, 
  Brain, 
  Clipboard, 
  Thermometer, 
  Dumbbell,
} from 'lucide-react';

// Datos sintéticos de los servicios
const mockServices: Service[] = [
  {
    id: 1,
    nombre: "Consulta Médica General",
    descripcion: "Evaluación completa de salud, diagnóstico inicial y recomendaciones generales para mejorar tu bienestar.",
    costo: 150.00,
    categoria: 'consulta',
    duracion: '45 min',
    icono: Stethoscope,
    disponibilidad: 'Lunes a Sábado',
    destacado: true
  },
  {
    id: 2,
    nombre: "Consulta Nutricional",
    descripcion: "Plan de alimentación personalizado, seguimiento y educación nutricional adaptada a tus necesidades específicas.",
    costo: 120.00,
    categoria: 'consulta',
    duracion: '60 min',
    icono: Apple,
    disponibilidad: 'Lunes a Viernes',
    destacado: true
  },
  {
    id: 3,
    nombre: "Terapia Psicológica",
    descripcion: "Sesiones individuales para abordar bienestar emocional y salud mental con profesionales especializados.",
    costo: 180.00,
    categoria: 'terapia',
    duracion: '50 min',
    icono: Brain,
    disponibilidad: 'Lunes a Sábado',
    destacado: false
  },
  {
    id: 4,
    nombre: "Chequeo Preventivo Anual",
    descripcion: "Exámenes y consultas enfocadas en la prevención y detección temprana de condiciones de salud relevantes.",
    costo: 350.00,
    categoria: 'chequeo',
    duracion: '120 min',
    icono: Clipboard,
    disponibilidad: 'Lunes a Viernes',
    destacado: true
  },
  {
    id: 5,
    nombre: "Consulta Endocrinología",
    descripcion: "Manejo especializado de trastornos hormonales y metabólicos por especialistas certificados.",
    costo: 200.00,
    categoria: 'consulta',
    duracion: '45 min',
    icono: Thermometer,
    disponibilidad: 'Martes y Jueves',
    destacado: false
  },
  {
    id: 6,
    nombre: "Plan de Ejercicio Personalizado",
    descripcion: "Diseño de rutina de ejercicios adaptada a tus necesidades y objetivos de salud específicos.",
    costo: 100.00,
    categoria: 'plan',
    duracion: '90 min',
    icono: Dumbbell,
    disponibilidad: 'Miércoles y Viernes',
    destacado: false
  },
];

// Simulación de la llamada a la API
export const ServicesService = {
  getAll: (): Promise<Service[]> => {
    return new Promise((resolve) => {
      // Simulamos un pequeño retraso como si fuera una llamada real
      setTimeout(() => {
        resolve(mockServices);
      }, 300);
    });
  },
  
  getById: (id: number): Promise<Service | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const service = mockServices.find(s => s.id === id) || null;
        resolve(service);
      }, 200);
    });
  },
  
  getByCategory: (category: ServiceCategory): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === 'todos') {
          resolve(mockServices);
        } else {
          const filteredServices = mockServices.filter(s => s.categoria === category);
          resolve(filteredServices);
        }
      }, 200);
    });
  },
  
  getHighlighted: (): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const highlightedServices = mockServices.filter(s => s.destacado);
        resolve(highlightedServices);
      }, 200);
    });
  }
};