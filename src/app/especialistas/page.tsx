// src/app/especialidades/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header/header';
import { CategoryFilter, SpecialistGrid } from './components';
import { useFilteredSpecialists } from './hooks/useFilteredSpecialists';
import { categoryLabels } from './services/specialists.service';

export default function EspecialidadesPage() {
  const {
    filteredSpecialists,
    selectedCategory,
    loading,
    error,
    selectCategory
  } = useFilteredSpecialists();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado de la página */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestros{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                Especialistas
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contamos con un equipo multidisciplinario de profesionales altamente calificados,
              comprometidos con tu bienestar y transformación.
            </p>
          </motion.div>

          {/* Filtro de categorías */}
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={selectCategory} 
          />
          
          {/* Título de la categoría seleccionada */}
          <motion.h2
            key={selectedCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            {selectedCategory === 'todos' 
              ? 'Todos nuestros especialistas' 
              : `Especialistas en ${categoryLabels[selectedCategory]}`
            }
          </motion.h2>

          {/* Mensaje de error */}
          {error && (
            <div className="text-center text-red-500 mb-8">
              {error}
            </div>
          )}

          {/* Grid de especialistas */}
          <SpecialistGrid 
            specialists={filteredSpecialists} 
            loading={loading} 
          />
        </div>
      </section>
    </main>
  );
}