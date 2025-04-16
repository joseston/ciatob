import React from 'react';
import Link from 'next/link';
import { BlogCategory, BlogPost } from '../types/blog.types';

interface BlogSidebarProps {
  categories: BlogCategory[];
  recentPosts: BlogPost[];
  loading: boolean;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  categories,
  recentPosts,
  loading
}) => {
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Categories section loading */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-6 bg-gray-200 w-1/2 mb-4 animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Recent posts loading */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-6 bg-gray-200 w-1/2 mb-4 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Categories section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Categorías
        </h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <Link 
                href={`/blog?category=${category.id}`}
                className="text-gray-600 hover:text-[#46b1b9] transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-[#46b1b9] rounded-full mr-2"></span>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Recent posts section */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Artículos recientes
          </h3>
          <div className="space-y-4">
            {recentPosts.map(post => (
              <div key={post.id} className="flex space-x-3">
                {post.featured_image_url && (
                  <Link href={`/blog/${post.slug}`} className="block w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={post.featured_image_url}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                )}
                <div>
                  <h4 className="text-sm font-medium">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-gray-700 hover:text-[#46b1b9] transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSidebar;