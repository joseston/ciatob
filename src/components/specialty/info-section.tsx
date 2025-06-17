// src/components/specialty/info-section.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface InfoItem {
  title: string;
  description: string;
}

interface InfoSectionProps {
  title: string;
  description: string;
  items: InfoItem[];
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  description,
  items
}) => {
  // Determine color based on specialty in title
  const getSpecialtyColor = (title: string) => {
    if (title.toLowerCase().includes('endocrinología')) {
      return '#02283b';
    } else if (title.toLowerCase().includes('nutrición')) {
      return '#d29113';
    } else if (title.toLowerCase().includes('psicología')) {
      return '#b72955';
    } else if (title.toLowerCase().includes('prescripción del ejercicio')) {
      return '#398e43';
    }
    return '#46b1b9'; // default
  };

  const specialtyColor = getSpecialtyColor(title);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle2 className={`w-6 h-6 text-[${specialtyColor}] mt-1 flex-shrink-0`} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;