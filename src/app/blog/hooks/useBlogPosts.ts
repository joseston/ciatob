import { useState, useEffect } from 'react';
import { BlogPost, BlogFilterParams, BlogPostsResponse } from '../types/blog.types';
import { BlogService } from '../services/blog.service';

export const useBlogPosts = (initialParams: BlogFilterParams) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterParams, setFilterParams] = useState<BlogFilterParams>(initialParams);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: initialParams.page || 1
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response: BlogPostsResponse = await BlogService.getBlogPosts(filterParams);
        setPosts(response.posts);
        setPagination({
          total: response.total,
          pages: response.pages,
          currentPage: response.current_page
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filterParams]);

  const updateFilters = (newParams: Partial<BlogFilterParams>) => {
    setFilterParams(prev => ({
      ...prev,
      ...newParams,
      page: newParams.category_id !== prev.category_id ? 1 : newParams.page || prev.page
    }));
  };

  return {
    posts,
    loading,
    error,
    pagination,
    filterParams,
    updateFilters
  };
};