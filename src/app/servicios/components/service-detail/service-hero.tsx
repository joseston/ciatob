'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Users, Award } from 'lucide-react';

interface ServiceFeature {
  icon: React.ElementType;
  label: string;
  value: string;
}

interface ServiceHeroProps {
  title: string;
  description: string;
  imageUrl: string;
  features: ServiceFeature[];
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  imageUrl,
  features = [
    { icon: Clock, label: "Duración", value: "60 min" },
    { icon: Users, label: "Atendidos", value: "+500" },
    { icon: Award, label: "Calificación", value: "4.9/5" }
  ]
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                {title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {description}
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <div className="flex flex-col items-center">
                    <feature.icon className="w-8 h-8 text-[#46b1b9] mb-2" />
                    <span className="text-2xl font-bold text-gray-900">{feature.value}</span>
                    <span className="text-sm text-gray-600">{feature.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src={imageUrl}
              alt={title}
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

export default ServiceHero;