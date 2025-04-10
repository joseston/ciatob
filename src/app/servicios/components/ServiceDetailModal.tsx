import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../types/service.types';
import { X, Clock, Calendar, DollarSign, CheckCircle } from 'lucide-react';

interface ServiceDetailModalProps {
  serviceId: number | null;
  onClose: () => void;
  getServiceById: (id: number) => Promise<Service | null>;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ serviceId, onClose, getServiceById }) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      if (serviceId) {
        setLoading(true);
        const serviceData = await getServiceById(serviceId);
        setService(serviceData);
        setLoading(false);
      } else {
        setService(null);
      }
    };

    fetchService();
  }, [serviceId, getServiceById]);

  // Si no hay servicio seleccionado, no mostramos nada
  if (!serviceId) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {loading ? (
            <div className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#46b1b9]"></div>
            </div>
          ) : service ? (
            <>
              <div className="relative">
                <div className="h-20 bg-gradient-to-r from-[#46b1b9] to-[#22616a]"></div>
                <div className="absolute top-0 right-0 p-4">
                  <button 
                    onClick={onClose}
                    className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {service.icono && (
                      <service.icono className="w-10 h-10 text-[#46b1b9]" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-14 pb-6 px-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.nombre}</h3>
                <p className="text-gray-600 mb-6">{service.descripcion}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-[#46b1b9] mr-3" />
                    <span className="text-gray-700">
                      <span className="font-semibold">Precio:</span> S/ {service.costo.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#46b1b9] mr-3" />
                    <span className="text-gray-700">
                      <span className="font-semibold">Duración:</span> {service.duracion}
                    </span>
                  </div>
                  {service.disponibilidad && (
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-[#46b1b9] mr-3" />
                      <span className="text-gray-700">
                        <span className="font-semibold">Disponibilidad:</span> {service.disponibilidad}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Beneficios del servicio:</h4>
                  <ul className="space-y-2">
                    {[
                      "Atención personalizada por especialistas",
                      "Instalaciones modernas y equipadas",
                      "Seguimiento continuo",
                      "Acceso a nuestro portal de pacientes"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#46b1b9] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <button 
                    className="w-full bg-gradient-to-r from-[#46b1b9] to-[#22616a] hover:opacity-90 text-white rounded-lg py-3 px-4 font-medium transition-all duration-200"
                    onClick={onClose}
                  >
                    Solicitar cita
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-600">No se pudo cargar la información del servicio.</p>
              <button 
                className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg py-2 px-4 transition-all duration-200"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
