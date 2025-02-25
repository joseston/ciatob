'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber,
  message = "Hola, me gustaría agendar una cita en CIATOB."
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Eliminar cualquier caracter no numérico del número de teléfono
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Construir la URL de WhatsApp con el número y mensaje
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mr-3 bg-white px-4 py-2 rounded-lg shadow-md"
          >
            <p className="text-gray-800 font-medium text-sm whitespace-nowrap">Chatea con nosotros</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contactar por WhatsApp"
      >
        {/* Logo de WhatsApp SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 175.216 175.552"
          className="w-8 h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M87.882 14.185c-40.525 0-73.475 32.95-73.49 73.475a73.318 73.318 0 0 0 11.208 38.948L14.14 161.26l35.34-9.258a73.504 73.504 0 0 0 38.312 10.513h.033c40.542 0 73.475-32.95 73.491-73.491a73.085 73.085 0 0 0-21.511-51.97 73.075 73.075 0 0 0-51.924-21.869zm-.05 135.75h-.026a61.033 61.033 0 0 1-31.098-8.505l-2.236-1.324-23.14 6.07 6.169-22.54-1.458-2.318a60.991 60.991 0 0 1-9.34-32.672c.012-33.701 27.445-61.118 61.163-61.118a60.729 60.729 0 0 1 43.136 17.894 60.762 60.762 0 0 1 17.877 43.152c-.015 33.712-27.438 61.13-61.047 61.13zm33.54-45.809c-1.844-.922-10.868-5.36-12.547-5.969-1.685-.613-2.909-.92-4.132.922-1.23 1.844-4.76 5.97-5.836 7.192-1.075 1.23-2.14 1.385-3.984.461-1.845-.922-7.795-2.871-14.84-9.148-5.483-4.892-9.189-10.933-10.259-12.777-1.075-1.844-.113-2.841.808-3.76.83-.825 1.844-2.15 2.764-3.225.922-1.076 1.23-1.844 1.844-3.072.614-1.23.307-2.304-.153-3.225-.461-.922-4.132-9.955-5.655-13.625-1.49-3.579-3-3.088-4.132-3.147-1.075-.051-2.305-.061-3.53-.061-1.23 0-3.225.461-4.909 2.305-1.685 1.844-6.435 6.292-6.435 15.33 0 9.04 6.589 17.771 7.511 19 .92 1.23 13.04 19.926 31.576 27.925 4.407 1.906 7.84 3.042 10.522 3.894 4.417 1.403 8.433 1.204 11.612.73 3.54-.531 10.868-4.439 12.394-8.734 1.53-4.292 1.53-7.97 1.075-8.732-.461-.767-1.685-1.23-3.53-2.15z" fillRule="evenodd"/>
        </svg>
        
        <span className="sr-only">Contactar por WhatsApp</span>
        
        {/* Pulse animation effect */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-25"></span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;