// src/app/empresas/services/empresa.service.ts
// src/app/empresas/services/empresa.service.ts
import { ContactoEmpresarial, PaqueteEmpresarial, ServicioCorporativo, CasoExito } from '../types/empresa.types';
import { paquetesEmpresariales } from '../data/paquetes-empresariales';
import { serviciosCorporativos } from '../data/servicios-corporativos';
import { casosExito } from '../data/casos-exito';

/* const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1; */

export const EmpresaService = {
  // Obtener todos los paquetes empresariales
  getPaquetes: (): Promise<PaqueteEmpresarial[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(paquetesEmpresariales);
      }, 300);
    });
  },

  // Obtener paquete por ID
  getPaqueteById: (id: string): Promise<PaqueteEmpresarial | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paquete = paquetesEmpresariales.find(p => p.id === id);
        resolve(paquete || null);
      }, 200);
    });
  },

  // Obtener servicios corporativos
  getServicios: (): Promise<ServicioCorporativo[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(serviciosCorporativos);
      }, 300);
    });
  },

  // Obtener casos de éxito
  getCasosExito: (): Promise<CasoExito[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(casosExito);
      }, 300);
    });
  },

  // Enviar contacto empresarial
  enviarContacto: async (contacto: ContactoEmpresarial): Promise<boolean> => {
    try {
      // Por ahora simulamos el envío
      // En el futuro se conectará con el backend real
      console.log('Enviando contacto empresarial:', contacto);
      
      // Simulamos delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulamos éxito (en desarrollo real habría validación del servidor)
      return true;
    } catch (error) {
      console.error('Error enviando contacto empresarial:', error);
      return false;
    }
  },

  // Solicitar propuesta personalizada
  solicitarPropuesta: async (datos: {
    nombreEmpresa: string;
    contacto: string;
    email: string;
    telefono: string;
    empleados: string;
    sector: string;
    necesidades: string;
  }): Promise<boolean> => {
    try {
      console.log('Solicitando propuesta personalizada:', datos);
      
      // Simulamos delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return true;
    } catch (error) {
      console.error('Error solicitando propuesta:', error);
      return false;
    }
  },

  // Agendar reunión comercial
  agendarReunion: async (datos: {
    nombreEmpresa: string;
    contacto: string;
    email: string;
    telefono: string;
    fechaPreferida: string;
    horaPreferida: string;
    modalidad: 'presencial' | 'virtual';
    mensaje?: string;
  }): Promise<boolean> => {
    try {
      console.log('Agendando reunión comercial:', datos);
      
      // Simulamos delay de red
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      return true;
    } catch (error) {
      console.error('Error agendando reunión:', error);
      return false;
    }
  }
};