import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../types/blog.types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Helper function to load images
const loaderProp = ({ src }: { src: string }) => {
  return src;
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const publishDate = new Date(post.published_at);
  
  // Structure:
  // - Featured image (if available)
  // - Categories pills
  // - Title (linked to post)
  // - Summary
  // - Author and date info
  
  return (
    <article className={`bg-white rounded-xl shadow-sm overflow-hidden ${featured ? 'col-span-2' : ''}`}>
      {post.featured_image_url && (
        <Link href={`/blog/${post.slug}`} className="block relative w-full h-48 overflow-hidden">
          <Image
            loader={loaderProp}
            unoptimized
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
          />
        </Link>
      )}
      
      <div className="p-5">
        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map(category => (
              <Link 
                key={category.id} 
                href={`/blog?category=${category.id}`}
                className="text-xs bg-[#46b1b9]/10 text-[#46b1b9] px-2 py-1 rounded-full"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h2 className={`font-bold text-gray-900 mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-[#46b1b9] transition-colors">
            {post.title}
          </Link>
        </h2>
        
        {/* Summary */}
        {post.summary && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.summary}
          </p>
        )}
        
        {/* Meta info */}
        <div className="flex items-center text-sm text-gray-500">
          <span>{post.author.name}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.published_at}>
            {format(publishDate, 'dd MMM yyyy', { locale: es })}
          </time>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;