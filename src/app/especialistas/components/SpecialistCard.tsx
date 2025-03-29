// src/app/especialidades/components/SpecialistCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Specialist } from '../types/specialist.types';
import Link from 'next/link';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

interface SpecialistCardProps {
  specialist: Specialist;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ specialist }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center p-6 rounded-xl bg-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden">
        <Image
          loader={loaderProp}
          unoptimized
          src={specialist.image}
          alt={specialist.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{specialist.name}</h3>
      <div className="flex items-center space-x-2">
        <Award className="w-5 h-5 text-[#46b1b9]" />
        <span className="text-[#46b1b9] font-medium">{specialist.specialty}</span>
      </div>
      <Link href="/agendar-cita" className="mt-4">
        <motion.button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Agendar Cita
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default SpecialistCard;