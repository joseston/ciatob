// src/app/page.tsx
'use client';

import React from 'react';
import HeroSection from '@/components/main/hero';
import VideoSection from '@/components/main/video-section';
import ServicesSection from '@/components/main/services';
import SpecialistsSection from '@/components/main/specialist';
import TestimonialsSection from '@/components/main/testimonials';

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <SpecialistsSection />
      <TestimonialsSection />
    </main>
  );
}