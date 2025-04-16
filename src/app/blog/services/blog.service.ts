// API service functions for blog data
import { 
    BlogPost, 
    BlogPostsResponse, 
    BlogCategoriesResponse, 
    BlogTagsResponse,
    BlogFilterParams 
  } from '../types/blog.types';
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  const DEFAULT_COMPANY_ID = Number(process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID) || 1;
  
  export const BlogService = {
    // Get blog posts with optional filtering
    getBlogPosts: async (params: BlogFilterParams): Promise<BlogPostsResponse> => {
      const queryParams = new URLSearchParams({
        company_id: DEFAULT_COMPANY_ID.toString(),
        page: params.page.toString(),
        per_page: params.per_page.toString()
      });
      
      if (params.category_id) {
        queryParams.append('category_id', params.category_id.toString());
      }
      
      if (params.tag_id) {
        queryParams.append('tag_id', params.tag_id.toString());
      }
      
      if (params.search) {
        queryParams.append('search', params.search);
      }
      
      try {
        const response = await fetch(`${API_URL}/business/blog/public/posts?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
    },
    
    // Get a single blog post by slug
    getBlogPostBySlug: async (slug: string): Promise<BlogPost> => {
      try {
        const queryParams = new URLSearchParams({
          company_id: DEFAULT_COMPANY_ID.toString()
        });
        
        const response = await fetch(`${API_URL}/business/blog/public/posts/slug/${slug}?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }
    },
    
    // Get all blog categories
    getBlogCategories: async (): Promise<BlogCategoriesResponse> => {
      try {
        const queryParams = new URLSearchParams({
          company_id: DEFAULT_COMPANY_ID.toString()
        });
        
        const response = await fetch(`${API_URL}/business/blog/public/categories?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog categories');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching blog categories:', error);
        throw error;
      }
    },
    
    // Get all blog tags
    getBlogTags: async (): Promise<BlogTagsResponse> => {
      try {
        const queryParams = new URLSearchParams({
          company_id: DEFAULT_COMPANY_ID.toString()
        });
        
        const response = await fetch(`${API_URL}/business/blog/public/tags?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog tags');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching blog tags:', error);
        throw error;
      }
    }
  };