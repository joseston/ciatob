// src/app/empresas/page.tsx
// src/app/empresas/page.tsx
'use client';

import React from 'react';
import {
  EmpresasHero,
  ProblemasSection,
  ServiciosCorporativos,
  PaquetesEmpresariales,
  CasosExito,
  ProcesoImplementacion,
  ContactoEmpresarial
} from './components';

export default function EmpresasPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <EmpresasHero />
      
      {/* Problemas que enfrentan las empresas */}
      <ProblemasSection />
      
      {/* Servicios corporativos disponibles */}
      <ServiciosCorporativos />
      
      {/* Paquetes empresariales */}
      <PaquetesEmpresariales />
      
      {/* Casos de éxito */}
      <CasosExito />
      
      {/* Proceso de implementación */}
      <ProcesoImplementacion />
      
      {/* Formulario de contacto empresarial */}
      <ContactoEmpresarial />
    </main>
  );
}