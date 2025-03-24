'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  imageUrl: string;
  category: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  slug,
  title,
  description,
  price,
  currency = 'S/',
  imageUrl,
  category
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="font-bold text-[#22616a]">
            {currency}{price}
          </div>
          
          <Link href={`/servicios/${slug}`}>
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-[#46b1b9] hover:text-[#22616a] transition-colors"
            >
              Ver detalles
              <ArrowRight className="ml-1 w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;