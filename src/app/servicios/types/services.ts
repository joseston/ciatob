// types/services.ts
import { LucideIcon } from "lucide-react";

// Interfaz para la tarjeta de servicio
export interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  imageUrl: string;
  category: string;
}

// Interfaz para la sección de características de un servicio
export interface ServiceFeature {
  icon: LucideIcon;
  label: string;
  value: string;
}

// Interfaz para los detalles completos de un servicio
export interface ServiceDetails extends ServiceCardProps {
  longDescription: string;
  title: string;
  description: string;
  imageUrl: string;
  features: ServiceFeature[];
  benefits: ServiceBenefitItem[];
  sections: ServiceContentSection[];
  pricingOptions?: ServicePricingOption[];
  discountedPrice?: number; // Add this property (optional with ?)

}

// Interfaz para las secciones de contenido
export interface ServiceContentSection {
  title: string;
  text: string;
}

// Interfaz para los elementos de beneficios
export interface ServiceBenefitItem {
  text: string;
}

// Interfaz para opciones de precios
export interface ServicePricingOption {
  id: string;
  title: string;
  price: number;
  currency?: string;
  discountedPrice?: number;
  features: string[];
  isPopular?: boolean;
}

// Interfaz para las categorías de servicios
export interface ServiceCategory {
  id: string;
  name: string;
}

// Interfaz para el resultado del hook de servicios
export interface UseServicesResult {
    services: ServiceCardProps[];
    serviceDetails: ServiceDetails | null;
    categories: string[];
    isLoading: boolean;
    error: Error | null;
    getServiceBySlug: (slug: string) => Promise<ServiceDetails | null>;
    getServicesByCategory: (category: string) => ServiceCardProps[];
  }

