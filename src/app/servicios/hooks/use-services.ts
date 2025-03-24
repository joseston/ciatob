'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAllServices, getServiceBySlug } from '../services/service-utils';
import { ServiceCardProps, ServiceDetails, UseServicesResult } from '../types/services';

/**
 * Hook para manejar los datos de servicios en la aplicación
 */
export const useServices = (): UseServicesResult => {
  const [services, setServices] = useState<ServiceCardProps[]>([]);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(null);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar todos los servicios
  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const data = await getAllServices();
        setServices(data);
        
        // Extraer categorías únicas
        const uniqueCategories = ['Todos', ...new Set(data.map(service => service.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar servicios'));
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // Función para obtener un servicio por slug
  const fetchServiceBySlug = useCallback(async (slug: string) => {
    try {
      setIsLoading(true);
      const service = await getServiceBySlug(slug);
      setServiceDetails(service);
      setIsLoading(false);
      return service;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Error al cargar el servicio: ${slug}`));
      setIsLoading(false);
      return null;
    }
  }, []);

  // Función para filtrar servicios por categoría
  const getServicesByCategory = useCallback((category: string) => {
    if (category === 'Todos') {
      return services;
    }
    return services.filter(service => service.category === category);
  }, [services]);

  // Retornar el resultado del hook
  return {
    services,
    serviceDetails,
    categories,
    isLoading,
    error,
    getServiceBySlug: fetchServiceBySlug,
    getServicesByCategory,
  };
};

export default useServices;