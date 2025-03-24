'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Header from '@/components/header/header';
import ServiceHero from '../components/service-detail/service-hero';
import ServiceContent from '../components/service-detail/service-content';
import ServicePricing from '../components/service-detail/service-pricing';
import ServiceCTA from '../components/service-detail/service-cta';
import useServices from '../hooks/use-services';
import { ServiceDetails } from '../types/services';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { getServiceBySlug, isLoading, error } = useServices();
  const [service, setService] = useState<ServiceDetails | null>(null);

  useEffect(() => {
    const loadServiceDetails = async () => {
      const serviceDetails = await getServiceBySlug(params.slug);
      if (serviceDetails) {
        setService(serviceDetails);
      }
    };

    loadServiceDetails();
  }, [params.slug, getServiceBySlug]);

  // Manejar el caso de carga
  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#46b1b9]"></div>
        </div>
      </main>
    );
  }

  // Manejar el caso de error o servicio no encontrado
  if (error || !service) {
    return notFound();
  }

  // Función para manejar el botón de reserva
  const handleBookNow = () => {
    // Aquí iría la lógica para iniciar el proceso de reserva
    console.log('Reservando servicio:', service.title);
    // Podría redirigir a una página de reserva o abrir un modal
    alert('Funcionalidad de reserva en desarrollo');
  };

  // Función para manejar el botón de contacto
  const handleContactUs = () => {
    // Aquí iría la lógica para contacto
    console.log('Contacto para servicio:', service.title);
    // Podría redirigir a una página de contacto
    router.push('/contacto');
  };

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
      
      {/* Content Section */}
      <ServiceContent
        sections={service.sections}
        benefits={service.benefits}
      />
      
      {/* Pricing Section */}
      <ServicePricing
        mainPrice={service.price}
        currency={service.currency}
        discountedPrice={service.discountedPrice}
        pricingOptions={service.pricingOptions}
        onBookNow={handleBookNow}
      />
      
      {/* CTA Section */}
      <ServiceCTA
        onPrimaryAction={handleBookNow}
        onSecondaryAction={handleContactUs}
      />
    </main>
  );
}