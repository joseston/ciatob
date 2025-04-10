// src/app/servicios/hooks/useServices.ts
import { useState, useEffect, useCallback } from 'react';
import { Service, ServiceCategory } from '../types/service.types';
import { ServicesService } from '../services/service.service';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('todos');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ServicesService.getAll();
      setServices(data);
      setFilteredServices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError('No se pudieron cargar los servicios.');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterServicesByCategory = useCallback(async (category: ServiceCategory) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      
      if (category === 'todos') {
        setFilteredServices(services);
      } else {
        const filtered = await ServicesService.getByCategory(category);
        setFilteredServices(filtered);
      }
    } catch (err) {
      console.error("Error filtering services:", err);
      setError('No se pudieron filtrar los servicios.');
    } finally {
      setLoading(false);
    }
  }, [services]);

  const getServiceById = useCallback(async (id: number) => {
    try {
      return await ServicesService.getById(id);
    } catch (err) {
      console.error("Error fetching service details:", err);
      setError('No se pudo cargar el detalle del servicio.');
      return null;
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    filteredServices,
    selectedCategory,
    loading,
    error,
    filterServicesByCategory,
    getServiceById
  };
};