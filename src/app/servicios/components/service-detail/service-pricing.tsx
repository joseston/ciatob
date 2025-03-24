'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar } from 'lucide-react';

interface PricingOption {
  id: string;
  title: string;
  price: number;
  currency?: string;
  discountedPrice?: number;
  features: string[];
  isPopular?: boolean;
}

interface ServicePricingProps {
  mainPrice: number;
  currency?: string;
  discountedPrice?: number;
  pricingOptions?: PricingOption[];
  onBookNow: () => void;
}

const ServicePricing: React.FC<ServicePricingProps> = ({
  mainPrice,
  currency = 'S/',
  discountedPrice,
  pricingOptions = [],
  onBookNow
}) => {
  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
         {/*  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Inversión en tu{' '}
            <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
              Salud
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestros precios están diseñados para hacer que la atención de calidad sea accesible para ti.
          </p> */}
        </motion.div>

        {/* Main Pricing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto mb-12"
        >
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900">Precio Estándar</h3>
              <div className="flex items-center mt-2">
                {discountedPrice && (
                  <span className="text-lg text-gray-400 line-through mr-3">
                    {currency}{mainPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-[#22616a]">
                  {currency}{discountedPrice || mainPrice}
                </span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookNow}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Ahora
            </motion.button>
          </div>
        </motion.div>

        {/* Optional Additional Pricing Plans */}
        {/* {pricingOptions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-6 relative ${
                  option.isPopular ? 'ring-2 ring-[#46b1b9]' : ''
                }`}
              >
                {option.isPopular && (
                  <div className="absolute top-0 right-0 bg-[#46b1b9] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                
                <div className="mb-4">
                  {option.discountedPrice ? (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 line-through mr-2">
                        {option.currency || currency}{option.price}
                      </span>
                      <span className="text-2xl font-bold text-[#22616a]">
                        {option.currency || currency}{option.discountedPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-[#22616a]">
                      {option.currency || currency}{option.price}
                    </span>
                  )}
                </div>
                
                <ul className="mb-6 space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#46b1b9] mt-0.5 flex-shrink-0" />
                      <span className="ml-2 text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBookNow}
                  className={`w-full py-2 rounded-lg font-medium ${
                    option.isPopular
                      ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Seleccionar
                </motion.button>
              </motion.div>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
};

export default ServicePricing;