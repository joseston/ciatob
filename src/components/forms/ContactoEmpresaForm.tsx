// src/components/forms/ContactoEmpresaForm.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, User, Mail, Phone, Users, Briefcase, MessageCircle, CheckCircle } from 'lucide-react';
import { ContactoEmpresarial } from '@/app/empresas/types/empresa.types';
import { useEmpresaContact } from '@/app/empresas/hooks/useEmpresaContact';

interface ContactoEmpresaFormProps {
  onSuccess?: () => void;
  className?: string;
}

const ContactoEmpresaForm: React.FC<ContactoEmpresaFormProps> = ({ onSuccess, className = '' }) => {
  const { loading, success, error, enviarContacto, resetState } = useEmpresaContact();
  
  const [formData, setFormData] = useState<ContactoEmpresarial>({
    nombreEmpresa: '',
    nombreContacto: '',
    cargo: '',
    email: '',
    telefono: '',
    empleados: '',
    sector: '',
    necesidades: [],
    mensaje: '',
    paqueteInteres: ''
  });

  const sectores = [
    'Tecnología',
    'Financiero',
    'Salud',
    'Educación',
    'Manufactura',
    'Servicios',
    'Retail',
    'Construcción',
    'Otro'
  ];

  const necesidadesOptions = [
    'Reducir ausentismo laboral',
    'Mejorar clima organizacional',
    'Programas de bienestar',
    'Manejo de estrés',
    'Nutrición corporativa',
    'Actividad física laboral',
    'Evaluaciones médicas',
    'Prevención de enfermedades'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNecesidadesChange = (necesidad: string) => {
    setFormData(prev => ({
      ...prev,
      necesidades: prev.necesidades.includes(necesidad)
        ? prev.necesidades.filter(n => n !== necesidad)
        : [...prev.necesidades, necesidad]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const resultado = await enviarContacto(formData);
    
    if (resultado && onSuccess) {
      onSuccess();
    }
  };

  const resetForm = () => {
    setFormData({
      nombreEmpresa: '',
      nombreContacto: '',
      cargo: '',
      email: '',
      telefono: '',
      empleados: '',
      sector: '',
      necesidades: [],
      mensaje: '',
      paqueteInteres: ''
    });
    resetState();
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">¡Solicitud Enviada!</h3>
        <p className="text-green-700 mb-6">
          Hemos recibido su solicitud. Nos contactaremos con usted en las próximas 24 horas para coordinar una reunión.
        </p>
        <button
          onClick={resetForm}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Enviar otra solicitud
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Información de la empresa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            Nombre de la empresa *
          </label>
          <input
            type="text"
            name="nombreEmpresa"
            value={formData.nombreEmpresa}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
            placeholder="Ingrese el nombre de su empresa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Número de empleados *
          </label>
          <select
            name="empleados"
            value={formData.empleados}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
          >
            <option value="">Seleccione...</option>
            <option value="1-50">1 - 50 empleados</option>
            <option value="51-100">51 - 100 empleados</option>
            <option value="101-200">101 - 200 empleados</option>
            <option value="201-500">201 - 500 empleados</option>
            <option value="500+">Más de 500 empleados</option>
          </select>
        </div>
      </div>

      {/* Información del contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Nombre del contacto *
          </label>
          <input
            type="text"
            name="nombreContacto"
            value={formData.nombreContacto}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
            placeholder="Su nombre completo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 inline mr-2" />
            Cargo *
          </label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
            placeholder="Su cargo en la empresa"
          />
        </div>
      </div>

      {/* Contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email corporativo *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
            placeholder="email@empresa.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
            placeholder="+51 xxx xxx xxx"
          />
        </div>
      </div>

      {/* Sector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sector de la empresa *
        </label>
        <select
          name="sector"
          value={formData.sector}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
        >
          <option value="">Seleccione el sector...</option>
          {sectores.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      {/* Necesidades */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ¿Qué necesidades tiene su empresa? (Seleccione todas las que apliquen)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {necesidadesOptions.map(necesidad => (
            <label key={necesidad} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.necesidades.includes(necesidad)}
                onChange={() => handleNecesidadesChange(necesidad)}
                className="w-4 h-4 text-[#02283b] border-gray-300 rounded focus:ring-[#02283b]"
              />
              <span className="text-sm text-gray-700">{necesidad}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Mensaje adicional (opcional)
        </label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02283b] focus:border-transparent"
          placeholder="Cuéntenos más sobre sus necesidades específicas..."
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#02283b] to-[#1a4a5c] hover:shadow-lg'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Enviando solicitud...
          </div>
        ) : (
          'Solicitar información'
        )}
      </motion.button>

      <p className="text-sm text-gray-600 text-center">
        Al enviar este formulario, acepta que nos contactemos para proporcionarle información sobre nuestros servicios empresariales.
      </p>
    </form>
  );
};

export default ContactoEmpresaForm;