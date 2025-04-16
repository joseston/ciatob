// src/app/blog/components/BlogPostHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Helper function para cargar imágenes
const loaderProp = ({ src }: { src: string }) => {
  return src;
};

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogPostHeaderProps {
  title: string;
  featured_image_url?: string;
  categories: Category[];
  summary?: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  featured_image_url,
  categories,
  summary
}) => {
  // Animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animación para los elementos hijos
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-6"
    >
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap gap-2 mb-4"
      >
        {categories.map(category => (
          <Link 
            key={category.id} 
            href={`/blog?category=${category.slug}`}
            className="text-sm bg-[#46b1b9]/10 text-[#46b1b9] px-3 py-1 rounded-full hover:bg-[#46b1b9]/20 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </motion.div>
      
      <motion.h1 
        variants={itemVariants} 
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
      >
        {title}
      </motion.h1>
      
      {summary && (
        <motion.div 
          variants={itemVariants}
          className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed bg-gray-50 p-4 rounded-xl border-l-4 border-[#46b1b9] italic"
        >
          {summary}
        </motion.div>
      )}
      
      {featured_image_url && (
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden rounded-xl shadow-lg mb-6"
        >
          <div className="relative w-full aspect-[16/9]">
            <Image
              loader={loaderProp}
              unoptimized
              src={featured_image_url}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Overlay decorativo con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BlogPostHeader;