// src/components/specialty/hero-specialty.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface HeroSpecialtyProps {
  title: string;
  description: string;
  imagePath: string;
  stats: Stat[];
}

const HeroSpecialty: React.FC<HeroSpecialtyProps> = ({
  title,
  description,
  imagePath,
  stats
}) => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#46b1b9]/10 to-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Especialidad en{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                {title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <div className="flex flex-col items-center">
                    <stat.icon className="w-8 h-8 text-[#46b1b9] mb-2" />
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Agendar Consulta
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src={imagePath}
              alt={`${title} en CIATOB`}
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSpecialty;