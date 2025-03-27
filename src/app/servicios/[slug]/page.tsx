// src/app/servicios/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Header from '@/components/header/header';
import ServiceHero from '../components/service-detail/service-hero';
import ServiceContent from '../components/service-detail/service-content';
import ServicePricing from '../components/service-detail/service-pricing';
import ServiceCTA from '../components/service-detail/service-cta';
import { getServiceBySlug } from '../services/service-utils';
import { Metadata } from 'next';

// Definir los parámetros de la página
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: 'Servicio no encontrado'
    };
  }
  
  return {
    title: `${service.title} | CIATOB`,
    description: service.description
  };
}

// Componente de página principal
export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  
  // Manejar el caso de servicio no encontrado
  if (!service) {
    return notFound();
  }

  // Crear funciones que se pasarán como props (se ejecutarán en el cliente)
  const handleBookNowProps = JSON.stringify({ 
    action: 'book', 
    serviceId: service.id, 
    title: service.title 
  });
  
  const handleContactUsProps = JSON.stringify({ 
    action: 'contact', 
    serviceId: service.id 
  });

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <ServiceHero
        title={service.title}
        description={service.description}
        imageUrl={service.imageUrl}
        features={service.features}
      />

      {/* Pricing Section */}
      <ServicePricing
        mainPrice={service.price}
        currency={service.currency}
        discountedPrice={service.discountedPrice}
        pricingOptions={service.pricingOptions}
        onBookNowProps={handleBookNowProps}
      />
      
      {/* Content Section */}
      <ServiceContent
        sections={service.sections}
        benefits={service.benefits}
      />
      
      {/* CTA Section */}
      <ServiceCTA
        primaryActionProps={handleBookNowProps}
        secondaryActionProps={handleContactUsProps}
      />
    </main>
  );
}