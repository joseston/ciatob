import React from 'react';
import { BlogPost } from '../types/blog.types';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
}

const BlogList: React.FC<BlogListProps> = ({ posts, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 text-red-700 rounded-lg my-8">
        <p>Error al cargar los artículos: {error.message}</p>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg my-8">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No se encontraron artículos
        </h3>
        <p className="text-gray-500">
          Intenta con otra categoría o vuelve más tarde.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {posts.map((post, index) => (
        <BlogCard
          key={post.id} 
          post={post}
          featured={index === 0}
        />
      ))}
    </div>
  );
};

export default BlogList;