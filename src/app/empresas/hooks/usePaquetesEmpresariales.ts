// src/app/empresas/hooks/usePaquetesEmpresariales.ts
// src/app/empresas/hooks/usePaquetesEmpresariales.ts
import { useState, useEffect } from 'react';
import { PaqueteEmpresarial, ServicioCorporativo, CasoExito } from '../types/empresa.types';
import { EmpresaService } from '../services/empresa.service';

export const usePaquetesEmpresariales = () => {
  const [paquetes, setPaquetes] = useState<PaqueteEmpresarial[]>([]);
  const [servicios, setServicios] = useState<ServicioCorporativo[]>([]);
  const [casosExito, setCasosExito] = useState<CasoExito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar todos los datos en paralelo
        const [paquetesData, serviciosData, casosData] = await Promise.all([
          EmpresaService.getPaquetes(),
          EmpresaService.getServicios(),
          EmpresaService.getCasosExito()
        ]);

        setPaquetes(paquetesData);
        setServicios(serviciosData);
        setCasosExito(casosData);
      } catch (err) {
        console.error('Error cargando datos empresariales:', err);
        setError('Error al cargar la información. Intente recargar la página.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPaqueteById = (id: string): PaqueteEmpresarial | undefined => {
    return paquetes.find(paquete => paquete.id === id);
  };

  const getPaqueteDestacado = (): PaqueteEmpresarial | undefined => {
    return paquetes.find(paquete => paquete.destacado);
  };

  const getServiciosByEspecialidad = (especialidad: 'endocrinologia' | 'nutricion' | 'psicologia' | 'ejercicio'): ServicioCorporativo[] => {
    return servicios.filter(servicio => servicio.especialidad === especialidad);
  };

  const getCasosBySector = (sector: string): CasoExito[] => {
    return casosExito.filter(caso => 
      caso.sector.toLowerCase().includes(sector.toLowerCase())
    );
  };

  return {
    paquetes,
    servicios,
    casosExito,
    loading,
    error,
    getPaqueteById,
    getPaqueteDestacado,
    getServiciosByEspecialidad,
    getCasosBySector
  };
};