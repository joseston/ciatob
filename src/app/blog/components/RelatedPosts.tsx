// src/app/blog/components/RelatedPosts.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Helper function para cargar imágenes
const loaderProp = ({ src }: { src: string }) => {
  return src;
};

interface Post {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  featured_image_url?: string;
  published_at: string;
}

interface RelatedPostsProps {
  posts: Post[];
  currentPostId: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, currentPostId }) => {
  // Filtramos el post actual y limitamos a 3 posts relacionados
  const filteredPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);
  
  if (filteredPosts.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 bg-gradient-to-r from-[#46b1b9]/20 to-transparent">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">Artículos relacionados</h3>
        <p className="text-sm text-gray-600 mb-0">Continúa aprendiendo con estos artículos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="flex flex-col h-full rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                {post.featured_image_url && (
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      loader={loaderProp}
                      unoptimized
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="text-base font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-[#46b1b9] transition-colors">
                    {post.title}
                  </h4>
                  {post.summary && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{post.summary}</p>
                  )}
                  <div className="flex items-center text-[#46b1b9] text-sm font-medium mt-auto">
                    <span>Leer artículo</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedPosts;