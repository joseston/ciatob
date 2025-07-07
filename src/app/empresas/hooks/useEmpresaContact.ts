// src/app/empresas/hooks/useEmpresaContact.ts
// src/app/empresas/hooks/useEmpresaContact.ts
import { useState } from 'react';
import { ContactoEmpresarial } from '../types/empresa.types';
import { EmpresaService } from '../services/empresa.service';

export const useEmpresaContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enviarContacto = async (contacto: ContactoEmpresarial) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const resultado = await EmpresaService.enviarContacto(contacto);
      
      if (resultado) {
        setSuccess(true);
        return true;
      } else {
        setError('No se pudo enviar el formulario. Intente nuevamente.');
        return false;
      }
    } catch {
      setError('Error al enviar el formulario. Verifique su conexión.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const solicitarPropuesta = async (datos: {
    nombreEmpresa: string;
    contacto: string;
    email: string;
    telefono: string;
    empleados: string;
    sector: string;
    necesidades: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const resultado = await EmpresaService.solicitarPropuesta(datos);
      
      if (resultado) {
        setSuccess(true);
        return true;
      } else {
        setError('No se pudo enviar la solicitud. Intente nuevamente.');
        return false;
      }
    } catch {
      setError('Error al enviar la solicitud. Verifique su conexión.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const agendarReunion = async (datos: {
    nombreEmpresa: string;
    contacto: string;
    email: string;
    telefono: string;
    fechaPreferida: string;
    horaPreferida: string;
    modalidad: 'presencial' | 'virtual';
    mensaje?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const resultado = await EmpresaService.agendarReunion(datos);
      
      if (resultado) {
        setSuccess(true);
        return true;
      } else {
        setError('No se pudo agendar la reunión. Intente nuevamente.');
        return false;
      }
    } catch {
      setError('Error al agendar la reunión. Verifique su conexión.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setLoading(false);
    setSuccess(false);
    setError(null);
  };

  return {
    loading,
    success,
    error,
    enviarContacto,
    solicitarPropuesta,
    agendarReunion,
    resetState
  };
};