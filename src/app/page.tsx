// src/app/page.tsx
'use client';

import React from 'react';
import Header from '@/components/header/header';
import HeroSection from '@/components/main/hero';
import ServicesSection from '@/components/main/services';
import SpecialistsSection from '@/components/main/specialist';
import TestimonialsSection from '@/components/main/testimonials';

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <SpecialistsSection />
      <TestimonialsSection />
    </main>
  );
}