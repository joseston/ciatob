// lib/services/service-utils.ts
import { ServiceCardProps, ServiceDetails } from '../types/services';
import { servicesData, servicesDetailsData } from './services-data';

/**
 * Obtiene todos los servicios disponibles
 * @returns Promise que resuelve a un array de servicios
 */
export async function getAllServices(): Promise<ServiceCardProps[]> {
  // Simulamos una llamada a API con un pequeño retraso
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(servicesData);
    }, 300);
  });
}

/**
 * Obtiene un servicio por su slug
 * @param slug Identificador único del servicio
 * @returns Promise que resuelve a los detalles del servicio o null si no se encuentra
 */
export async function getServiceBySlug(slug: string): Promise<ServiceDetails | null> {
  // Simulamos una llamada a API con un pequeño retraso
  return new Promise((resolve) => {
    setTimeout(() => {
      const service = servicesDetailsData.find(service => service.slug === slug) || null;
      resolve(service);
    }, 300);
  });
}

/**
 * Filtra servicios por categoría
 * @param services Lista de servicios a filtrar
 * @param category Categoría por la que filtrar
 * @returns Array de servicios filtrados
 */
export function filterServicesByCategory(services: ServiceCardProps[], category: string): ServiceCardProps[] {
  if (category === 'Todos') {
    return services;
  }
  return services.filter(service => service.category === category);
}

/**
 * Formatea un precio para mostrar
 * @param price Precio a formatear
 * @param currency Moneda (por defecto S/)
 * @returns String con el precio formateado
 */
export function formatPrice(price: number, currency: string = 'S/'): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Genera un slug a partir de un título
 * @param title Título a convertir en slug
 * @returns Slug generado
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
}

/**
 * Extrae todas las categorías únicas de los servicios
 * @param services Lista de servicios
 * @returns Array de categorías únicas
 */
export function extractUniqueCategories(services: ServiceCardProps[]): string[] {
  const categories = new Set(services.map(service => service.category));
  return ['Todos', ...Array.from(categories)];
}