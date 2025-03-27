'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check } from 'lucide-react'; // Descomentamos Check
import { ServicePricingOption } from '../../types/services'; // <--- IMPORTAMOS el tipo (ajusta la ruta si es necesario)

// Eliminamos la interfaz local PricingOption

interface ServicePricingProps {
  mainPrice: number;
  currency?: string;
  discountedPrice?: number;
  pricingOptions?: ServicePricingOption[]; // <--- USAMOS el tipo importado
  onBookNowProps: () => void; // Renombrada para claridad, ya que onBookNow estaba sin definir dentro del map
}

const ServicePricing: React.FC<ServicePricingProps> = ({
  mainPrice,
  currency = 'S/',
  discountedPrice,
  pricingOptions = [], // Ahora esta prop se usará
  onBookNowProps
}) => {
  return (
    <section className="bg-white py-16"> {/* Añadido padding para mejor espaciado */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ya no necesitamos el div de título vacío */}
        {/* <motion.div ... </motion.div> */}

        {/* Main Pricing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }} // Ajustado delay
          className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto mb-12 border border-gray-100" // Añadido borde sutil
        >
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900">Precio Estándar</h3>
              <div className="flex items-baseline justify-center md:justify-start mt-2"> {/* Alineación baseline */}
                {discountedPrice && (
                  <span className="text-lg text-gray-400 line-through mr-3">
                    {currency}{mainPrice.toFixed(2)} {/* Asegurar 2 decimales */}
                  </span>
                )}
                <span className="text-4xl font-extrabold text-[#22616a]"> {/* Tamaño aumentado */}
                  {currency}{(discountedPrice || mainPrice).toFixed(2)} {/* Asegurar 2 decimales */}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }} // Mejorado hover
              whileTap={{ scale: 0.95 }}
              onClick={onBookNowProps}
              className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#46b1b9]" // Mejorado estilo y accesibilidad
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Ahora
            </motion.button>
          </div>
        </motion.div>

        {/* Optional Additional Pricing Plans */}
        {/* Descomentamos esta sección */}
        {pricingOptions && pricingOptions.length > 0 && (
          <div className="mt-16"> {/* Añadido margen superior */}
             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Otras Opciones</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricingOptions.map((option, index) => (
                <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`bg-white rounded-xl shadow-lg p-6 flex flex-col ${ // Flex col para alinear botón abajo
                    option.isPopular ? 'ring-2 ring-[#46b1b9]' : 'border border-gray-200' // Borde normal si no es popular
                    }`}
                >
                    {option.isPopular && (
                    <div className="absolute top-0 right-0 bg-[#46b1b9] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg transform translate-x-0 -translate-y-0"> {/* Ajuste posición */}
                        Popular
                    </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>

                    <div className="mb-4">
                    {option.discountedPrice ? (
                        <div className="flex items-baseline"> {/* Alineación baseline */}
                        <span className="text-sm text-gray-400 line-through mr-2">
                            {(option.currency || currency)}{option.price.toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-[#22616a]">
                            {(option.currency || currency)}{option.discountedPrice.toFixed(2)}
                        </span>
                        </div>
                    ) : (
                        <span className="text-2xl font-bold text-[#22616a]">
                        {(option.currency || currency)}{option.price.toFixed(2)}
                        </span>
                    )}
                    </div>

                    <ul className="mb-6 space-y-2 text-sm text-gray-600 flex-grow"> {/* Flex grow para empujar botón abajo */}
                    {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-[#46b1b9] mt-0.5 flex-shrink-0 mr-2" /> {/* Añadido margen */}
                        <span>{feature}</span>
                        </li>
                    ))}
                    </ul>

                    {/* // TODO: Considerar si este botón debe hacer lo mismo que el principal
                        // o si necesita pasar información sobre la opción seleccionada.
                        // Por ahora, usa la misma función `onBookNowProps`. */}
                    <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onBookNowProps} // Usamos la prop recibida
                    className={`w-full mt-auto py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${ // mt-auto para alinear al fondo
                        option.isPopular
                        ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white hover:opacity-90'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    >
                    Seleccionar Plan
                    </motion.button>
                </motion.div>
                ))}
             </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicePricing;