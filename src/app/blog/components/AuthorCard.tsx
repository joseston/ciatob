// src/app/blog/components/AuthorCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Award } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Helper function to load images
const loaderProp = ({ src }: { src: string }) => {
  return src;
};

interface AuthorCardProps {
  author: {
    name: string;
    bio?: string;
    image_url?: string;
    role?: string;
  };
  publishedAt: string;
  readTime?: number; // Tiempo estimado de lectura en minutos
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, publishedAt, readTime }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row items-center md:items-start gap-4 rounded-xl bg-white p-6 shadow-sm border border-gray-100"
    >
      {/* Foto del autor */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#46b1b9]/20">
        <Image
          loader={loaderProp}
          unoptimized
          src={author.image_url || 'https://static.scieluxe.com/files/default-avatar.jpg'}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Información del autor */}
      <div className="flex flex-col text-center md:text-left">
        <h3 className="text-lg font-semibold text-gray-900">{author.name}</h3>
        {author.role && (
          <p className="text-[#46b1b9] text-sm mb-2">{author.role}</p>
        )}
        {author.bio && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{author.bio}</p>
        )}
        
        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-[#46b1b9]" />
            <time dateTime={publishedAt}>
              {format(new Date(publishedAt), 'dd MMMM yyyy', { locale: es })}
            </time>
          </div>
          
          {readTime && (
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1 text-[#46b1b9]" />
              <span>{readTime} min. de lectura</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;