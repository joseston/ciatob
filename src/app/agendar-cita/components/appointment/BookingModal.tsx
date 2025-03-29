// src/app/agendar-cita/components/appointment/BookingModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, CheckSquare } from 'lucide-react';
import { Slot, Doctor } from '../../types/appointment';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface PatientFormData {
  dni: string;
  nombre: string;
  telefono: string;
  email?: string;
  acceptTerms: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PatientFormData) => void;
  doctor: Doctor | null;
  selectedSlot: Slot | null;
  isLoading: boolean;
  errorMessage?: string | null;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  doctor,
  selectedSlot,
  isLoading,
  errorMessage
}) => {
  const [formData, setFormData] = useState<PatientFormData>({
    dni: '',
    nombre: '',
    telefono: '',
    email: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});
  const [isCheckingDni, setIsCheckingDni] = useState(false);
  const [patientType, setPatientType] = useState<string | null>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        dni: '',
        nombre: '',
        telefono: '',
        email: '',
        acceptTerms: false
      });
      setErrors({});
      setPatientType(null);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof PatientFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};
    
    // Validar DNI (8 dígitos)
    if (!formData.dni || !/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'El DNI debe tener 8 dígitos numéricos';
    }
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    // Validar teléfono (9 dígitos)
    if (!formData.telefono || !/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 9 dígitos';
    }
    
    // Validar email (opcional)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    // Validar términos y condiciones
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h2 className="text-xl font-semibold text-gray-900">Datos para tu reserva</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
                disabled={isLoading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {doctor && selectedSlot && (
                <div className="mb-6 p-4 bg-[#46b1b9]/10 rounded-lg">
                  <p className="font-medium text-gray-700 mb-2">Reserva con:</p>
                  <p className="text-[#46b1b9] font-semibold">{doctor.nombre}</p>
                  {doctor.specialty && (
                    <p className="text-gray-600 text-sm mb-3">{doctor.specialty.name}</p>
                  )}
                  
                  <div className="flex items-center mt-2">
                    <Calendar className="w-4 h-4 text-[#46b1b9] mr-2" />
                    <p className="text-gray-700 text-sm">
                      {format(parseISO(selectedSlot.fecha), 'EEEE dd MMMM yyyy', { locale: es })}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <Clock className="w-4 h-4 text-[#46b1b9] mr-2" />
                    <p className="text-gray-700 text-sm">
                      {selectedSlot.hora_inicio} - {selectedSlot.hora_fin}
                    </p>
                  </div>
                </div>
              )}
              
              {patientType === 'RETURNING' && (
                <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center">
                  <div className="mr-2">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div>
                    ¡Bienvenido nuevamente! Hemos encontrado tus datos previos.
                  </div>
                </div>
              )}
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dni">
                    DNI o Documento de Identidad *
                  </label>
                  <div className="relative">
                    <input
                      id="dni"
                      name="dni"
                      type="text"
                      value={formData.dni}
                      onChange={handleChange}
                      className={`w-full p-2 pl-9 border rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none ${
                        errors.dni ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ingresa tu DNI (8 dígitos)"
                      maxLength={8}
                      disabled={isLoading}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    {isCheckingDni && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-[#46b1b9] border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                  {errors.dni && <p className="mt-1 text-sm text-red-500">{errors.dni}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nombre">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`w-full p-2 pl-9 border rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none ${
                        errors.nombre ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ingresa tu nombre completo"
                      disabled={isLoading}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telefono">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full p-2 pl-9 border rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none ${
                        errors.telefono ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ingresa tu número de teléfono"
                      maxLength={9}
                      disabled={isLoading}
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.telefono && <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email (opcional)
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 pl-9 border rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ingresa tu email"
                      disabled={isLoading}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div className="flex items-start mt-4">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#46b1b9] rounded border-gray-300 focus:ring-[#46b1b9] mt-1"
                    disabled={isLoading}
                  />
                  <label className="ml-2 block text-sm text-gray-700" htmlFor="acceptTerms">
                    Acepto los términos y condiciones de reserva y la política de privacidad
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>
                )}
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white transition-all ${
                      isLoading ? 'opacity-70 cursor-wait' : 'hover:shadow-md'
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Procesando...
                      </span>
                    ) : (
                      'Reservar Cita'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;