// src/components/appointment/TimeSlotSelector.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { /* Clock */ MessageCircle } from 'lucide-react';
/* import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'; */
import { Slot, GroupedSlots, Doctor } from '../../types/appointment';

interface TimeSlotSelectorProps {
  groupedSlots: GroupedSlots;
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
  loading: boolean;
  doctorSelected: boolean;
  selectedDoctor?: Doctor | null;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  /* groupedSlots, */
  selectedSlot,
  onSelectSlot,
  /* loading, */
  doctorSelected,
  selectedDoctor
}) => {  const [isDesktop, setIsDesktop] = useState(false);

  // Detectar si es un dispositivo de escritorio
  useEffect(() => {
    const checkIfDesktop = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP)))/i.test(userAgent);
      
      setIsDesktop(!isMobile && !isTablet);
    };

    checkIfDesktop();
  }, []);

  // Función para generar el mensaje de WhatsApp con los datos del especialista seleccionado
  const generateWhatsAppMessage = () => {
    if (!selectedDoctor) return "";
    
    const doctorTitle = selectedDoctor.specialty?.name?.toLowerCase().includes('psicolog') ? 'Lic.' :
                        (selectedDoctor.specialty?.name?.toLowerCase().includes('nutri') ? 'Lic.' : 
                        (selectedDoctor.gender === 'female' ? 'Dra.' : 'Dr.'));
      return `Hola, quisiera una cita con el ${doctorTitle} ${selectedDoctor.nombre}, de la especialidad de ${selectedDoctor.specialty?.name || 'especialidad'}, ¿qué horarios tiene disponible?`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2 text-[#46b1b9]" />
        Contacto Directo
      </h2>

      {!doctorSelected ? (
        <div className="text-center py-10 text-gray-500">
          <p>Selecciona un especialista para contactar por WhatsApp</p>
        </div>
      ) : (        <div className="space-y-6">
          <div className="p-5 bg-[#25D366]/10 rounded-lg border border-[#25D366]/30">
            <p className="text-gray-700 mb-6">
              Para agendar tu cita con {selectedDoctor?.gender === 'female' ? 'la' : 'el'} {
                selectedDoctor?.specialty?.name?.toLowerCase().includes('psicolog') ? 'Lic.' :
                (selectedDoctor?.specialty?.name?.toLowerCase().includes('nutri') ? 'Lic.' : 
                (selectedDoctor?.gender === 'female' ? 'Dra.' : 'Dr.'))
              } {selectedDoctor?.nombre}, haz clic en el botón para contactar por WhatsApp.
            </p>
            
            <div className="flex justify-center">
              <motion.a
                href={isDesktop 
                  ? `https://web.whatsapp.com/send?phone=+51948213270&text=${encodeURIComponent(generateWhatsAppMessage())}`
                  : `https://wa.me/+51948213270?text=${encodeURIComponent(generateWhatsAppMessage())}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 rounded-lg bg-[#25D366] text-white font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Si existe un slot seleccionado, lo deseleccionamos
                  if (selectedSlot) {
                    onSelectSlot(selectedSlot);
                  }
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 175.216 175.552"
                  className="w-6 h-6 fill-white mr-2"
                  aria-hidden="true"
                >
                  <path d="M87.882 14.185c-40.525 0-73.475 32.95-73.49 73.475a73.318 73.318 0 0 0 11.208 38.948L14.14 161.26l35.34-9.258a73.504 73.504 0 0 0 38.312 10.513h.033c40.542 0 73.475-32.95 73.491-73.491a73.085 73.085 0 0 0-21.511-51.97 73.075 73.075 0 0 0-51.924-21.869zm-.05 135.75h-.026a61.033 61.033 0 0 1-31.098-8.505l-2.236-1.324-23.14 6.07 6.169-22.54-1.458-2.318a60.991 60.991 0 0 1-9.34-32.672c.012-33.701 27.445-61.118 61.163-61.118a60.729 60.729 0 0 1 43.136 17.894 60.762 60.762 0 0 1 17.877 43.152c-.015 33.712-27.438 61.13-61.047 61.13zm33.54-45.809c-1.844-.922-10.868-5.36-12.547-5.969-1.685-.613-2.909-.92-4.132.922-1.23 1.844-4.76 5.97-5.836 7.192-1.075 1.23-2.14 1.385-3.984.461-1.845-.922-7.795-2.871-14.84-9.148-5.483-4.892-9.189-10.933-10.259-12.777-1.075-1.844-.113-2.841.808-3.76.83-.825 1.844-2.15 2.764-3.225.922-1.076 1.23-1.844 1.844-3.072.614-1.23.307-2.304-.153-3.225-.461-.922-4.132-9.955-5.655-13.625-1.49-3.579-3-3.088-4.132-3.147-1.075-.051-2.305-.061-3.53-.061-1.23 0-3.225.461-4.909 2.305-1.685 1.844-6.435 6.292-6.435 15.33 0 9.04 6.589 17.771 7.511 19 .92 1.23 13.04 19.926 31.576 27.925 4.407 1.906 7.84 3.042 10.522 3.894 4.417 1.403 8.433 1.204 11.612.73 3.54-.531 10.868-4.439 12.394-8.734 1.53-4.292 1.53-7.97 1.075-8.732-.461-.767-1.685-1.23-3.53-2.15z" fillRule="evenodd"/>
                </svg>
                ABRIR WHATSAPP WEB
              </motion.a>
            </div>
          </div>
          
          {/* Comentamos el código original para futuro uso
          {/* 
          <div className="text-center py-5 text-gray-500 bg-gray-50 rounded-lg">
            <p className="text-sm mb-2">El sistema de horarios en línea está en mantenimiento.</p>
            <p className="text-sm">Por favor contacta directamente por WhatsApp para agendar tu cita.</p>
          </div>
          */}
        </div>
      )}
    </motion.div>
  );
};

export default TimeSlotSelector;