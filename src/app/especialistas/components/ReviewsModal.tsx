'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { Specialist } from '../types/specialist.types';

interface ReviewsModalProps {
  specialist: Specialist;
  isOpen: boolean;
  onClose: () => void;
}

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

// Función para determinar el título adecuado según la especialidad y género
const getTitleForSpecialist = (specialist: Specialist): string => {
  // Para nutrición y deportología (prescripción del ejercicio) usar "Lic."
  if (specialist.category === 'nutricion' || specialist.category === 'deportologia') {
    return 'Lic.';
  }
  
  // Para endocrinología (médicos) usar "Dr." o "Dra." según el género
  if (specialist.gender === 'female') {
    return 'Dra.';
  }
  
  return 'Dr.';
};

const ReviewsModal: React.FC<ReviewsModalProps> = ({ specialist, isOpen, onClose }) => {
  // Si el modal no está abierto, no renderizamos nada
  if (!isOpen) return null;
  
  // Si no hay reseñas para este especialista
  const noReviews = !specialist.reviews || specialist.reviews.length === 0;
  
  // Obtenemos el título correcto para el especialista
  const title = getTitleForSpecialist(specialist);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#46b1b9] to-[#22616a] p-6 pb-12">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-white bg-white/20 rounded-full p-1 hover:bg-white/30 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="h-6 w-6" />
                </button>
                
                <h2 className="text-2xl font-bold text-white">
                  Opiniones de pacientes
                </h2>
              </div>
              
              {/* Información del especialista */}
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 -mt-8 bg-white rounded-t-xl relative z-10">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    loader={loaderProp}
                    unoptimized
                    src={specialist.image}
                    alt={specialist.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-800">{title} {specialist.name}</h3>
                  <p className="text-[#46b1b9] font-medium">{specialist.specialty}</p>
                  
                  {/* Promedio de calificación */}
                  {!noReviews && (
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (specialist.averageRating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {specialist.reviews?.length} {specialist.reviews?.length === 1 ? 'opinión' : 'opiniones'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Contenido de las reseñas */}
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                {noReviews ? (
                  <div className="text-center py-8">
                    <Quote className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Este especialista aún no tiene opiniones de pacientes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {specialist.reviews?.map((review, index) => (
                      <motion.div
                        key={review.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-6 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{review.patientInfo}</p>
                        </div>
                        
                        <p className="text-gray-700 italic">&ldquo;{review.content}&rdquo;</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReviewsModal;