// Define Blog data types
export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content?: string;
    summary?: string;
    featured_image_url?: string;
    published_at: string;
    view_count: number;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    categories: BlogCategory[];
    tags: BlogTag[];
    author: {
      name: string;
      bio?: string;
      image_url?: string;
      role?: string;
    };
  }
  
  export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parent_id?: number;
  }
  
  export interface BlogTag {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface PaginationParams {
    page: number;
    per_page: number;
  }
  
  export interface BlogPostsResponse {
    posts: BlogPost[];
    total: number;
    pages: number;
    current_page: number;
  }
  
  export interface BlogCategoriesResponse {
    categories: BlogCategory[];
  }
  
  export interface BlogTagsResponse {
    tags: BlogTag[];
  }
  
  export interface BlogFilterParams extends PaginationParams {
    category_id?: number;
    tag_id?: number;
    search?: string;
    limit?: number;
  }