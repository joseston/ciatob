// src/app/empresas/page.tsx
// src/app/empresas/page.tsx
'use client';

import React from 'react';
import {
  EmpresasHero,
  ProblemasSection,
  SeminarioDetails,
  InBodySection,
  ServiciosCorporativos,
  PaquetesEmpresariales,
  CasosExito,
  TargetEmpresarial,
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
      
      {/* Seminarios de Actualización Médica */}
      <SeminarioDetails />
      
      {/* Tecnología InBody */}
      <InBodySection />
      
      {/* Servicios corporativos disponibles */}
      <ServiciosCorporativos />
      
      {/* Paquetes empresariales */}
      <PaquetesEmpresariales />
      
      {/* Casos de éxito reales */}
      <CasosExito />
      
      {/* Sectores objetivo */}
      <TargetEmpresarial />
      
      {/* Proceso de implementación */}
      <ProcesoImplementacion />
      
      {/* Formulario de contacto empresarial */}
      <ContactoEmpresarial />
    </main>
  );
}