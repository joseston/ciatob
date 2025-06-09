// src/components/specialty/faq-section.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  specialty?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, specialty }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Determine color based on specialty prop
  const getSpecialtyColor = (specialtyName?: string) => {
    switch (specialtyName?.toLowerCase()) {
      case 'nutrición':
        return '#d29113';
      case 'endocrinología':
        return '#02283b';
      case 'psicología':
        return '#b72955';
      case 'medicina deportiva':
        return '#398e43';
      default:
        return '#46b1b9';
    }
  };

  const specialtyColor = getSpecialtyColor(specialty);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre la prescripción de ejercicio en el manejo de la obesidad
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className={`w-5 h-5 text-[${specialtyColor}]`} />
                ) : (
                  <Plus className={`w-5 h-5 text-[${specialtyColor}]`} />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white rounded-lg mt-2 shadow-md">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;