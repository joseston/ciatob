'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogHeader, BlogList, CategoryFilter, Pagination, BlogSidebar } from './components';
import { useBlogPosts } from './hooks/useBlogPosts';
import { useCategories } from './hooks/useCategories';

// Componente que utiliza useSearchParams
const BlogContent = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category') 
    ? Number(searchParams.get('category')) 
    : undefined;
  const pageParam = searchParams.get('page') 
    ? Number(searchParams.get('page')) 
    : 1;
  
  const {
    posts,
    loading,
    error,
    pagination,
    filterParams,
    updateFilters
  } = useBlogPosts({
    page: pageParam,
    per_page: 6,
    category_id: categoryId
  });
  
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Handle category filter change
  const handleCategoryChange = (categoryId: number | undefined) => {
    updateFilters({ category_id: categoryId, page: 1 });
    // Update URL without full page reload
    const url = new URL(window.location.href);
    if (categoryId) {
      url.searchParams.set('category', categoryId.toString());
    } else {
      url.searchParams.delete('category');
    }
    url.searchParams.set('page', '1');
    window.history.pushState({}, '', url.toString());
  };
  
  // Handle pagination change
  const handlePageChange = (page: number) => {
    updateFilters({ page });
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url.toString());
  };
  
  return (
    <>
      <BlogHeader 
        title="Nuestro Blog" 
        description="Artículos, noticias y consejos sobre salud y bienestar"
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="w-full md:w-2/3">
          <CategoryFilter 
            categories={categories} 
            selectedCategoryId={filterParams.category_id} 
            onCategoryChange={handleCategoryChange}
            loading={categoriesLoading}
          />
          
          <BlogList 
            posts={posts}
            loading={loading}
            error={error}
          />
          
          <Pagination 
            currentPage={pagination.currentPage}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
          />
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <BlogSidebar 
            categories={categories}
            recentPosts={posts.slice(0, 3)}
            loading={loading || categoriesLoading}
          />
        </div>
      </div>
    </>
  );
};

// Componente de carga fallback para el Suspense
const BlogLoading = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    <div className="space-y-4 mt-8">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
);

// Componente principal que envuelve el contenido en Suspense
const BlogPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<BlogLoading />}>
          <BlogContent />
        </Suspense>
      </div>
    </main>
  );
};

export default BlogPage;