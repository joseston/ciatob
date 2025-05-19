// src/components/main/specialists.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Star } from 'lucide-react';
import ReviewsModal from '../../app/especialistas/components/ReviewsModal';
import { Specialist } from '../../app/especialistas/types/specialist.types';
import { specialists as specialistsData } from '../../app/especialistas/services/specialists.service';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

// Utilizamos los especialistas del servicio de especialistas que ya tiene reviews
// Ordenamos por cantidad de opiniones (de mayor a menor)
const specialists: Specialist[] = specialistsData
  .map(specialist => ({
    ...specialist,
    // Si el especialista no tiene una categoría definida, asignamos 'todos' como valor por defecto
    category: specialist.category || 'todos'
  }))
  .sort((a, b) => {
    const reviewsA = a.reviews?.length || 0;
    const reviewsB = b.reviews?.length || 0;
    return reviewsB - reviewsA;
  });

const SpecialistCard: React.FC<{
  specialist: Specialist;
  isSelected: boolean;
  onReviewsClick: (specialist: Specialist) => void;
}> = ({ specialist, isSelected, onReviewsClick }) => {
  const hasReviews = specialist.reviews && specialist.reviews.length > 0;
  
  return (
    <motion.div
      className={`relative flex flex-col items-center p-6 rounded-xl bg-white shadow-lg transition-all duration-300 ${
        isSelected ? 'scale-105 shadow-xl' : 'hover:shadow-xl hover:scale-102'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
        <Image
          loader={loaderProp}
          unoptimized
          src={specialist.image}
          alt={specialist.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>      <h3 className="text-xl font-semibold text-gray-900 mb-2">{specialist.name}</h3>
      <div className="flex items-center space-x-2 mb-4">
        <Award className="w-5 h-5 text-[#46b1b9]" />
        <span className="text-[#46b1b9] font-medium">{specialist.specialty}</span>
      </div>
      
      {/* Estrellas clickeables para mostrar reseñas */}
      <button
        onClick={() => onReviewsClick(specialist)}
        className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                hasReviews && i < (specialist.averageRating || 0)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {hasReviews 
            ? `${specialist.reviews?.length} ${specialist.reviews?.length === 1 ? 'opinión' : 'opiniones'}`
            : 'Sin opiniones'
          }
        </span>
      </button>
    </motion.div>
  );
};

const SpecialistsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsToShow = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
  const totalSlides = specialists.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleSpecialists = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % totalSlides;
      items.push({ ...specialists[index], key: `${index}-${i}` });
    }
    return items;
  }, [currentIndex, itemsToShow, totalSlides]);

  const handleReviewsClick = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full px-4 py-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-2 rounded-full bg-white shadow-lg text-[#46b1b9] hover:text-[#22616a] transition-colors duration-200 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <div className="flex-1 overflow-hidden mx-4">
          <div className="flex justify-center gap-6">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              {visibleSpecialists.map((specialist, index) => (
                <motion.div
                  key={specialist.key}
                  custom={direction}
                  initial={{ 
                    x: direction > 0 ? 100 : -100 
                  }}
                  animate={{ 
                    x: 0 
                  }}
                  exit={{ 
                    x: direction > 0 ? -100 : 100 
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "linear"
                  }}
                  className="flex-1 min-w-0"
                >
                  <SpecialistCard
                    specialist={specialist}
                    isSelected={index === 0}
                    onReviewsClick={handleReviewsClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-2 rounded-full bg-white shadow-lg text-[#46b1b9] hover:text-[#22616a] transition-colors duration-200 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Modal de Testimonios */}
      {selectedSpecialist && (
        <ReviewsModal
          specialist={selectedSpecialist}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const SpecialistsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo de Especialistas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Contamos con un equipo multidisciplinario de profesionales altamente calificados,
              comprometidos con tu bienestar y transformación.
            </p>
          </motion.div>
        </div>
        
        <SpecialistsCarousel />
      </div>
    </section>
  );
};

export default SpecialistsSection;