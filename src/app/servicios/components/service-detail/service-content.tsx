'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ContentSection {
  title: string;
  text: string;
}

interface BenefitItem {
  text: string;
}

interface ServiceContentProps {
  sections: ContentSection[];
  benefits: BenefitItem[];
}

const ServiceContent: React.FC<ServiceContentProps> = ({
  sections,
  benefits
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 space-y-4">
                    {section.text.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Benefits Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Beneficios
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <Check className="w-5 h-5 text-[#46b1b9] mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">{benefit.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;