'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useBlogPost } from '../hooks/useBlogPost';
import { useCategories } from '../hooks/useCategories';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { 
  BlogSidebar, 
  ShareButtons, 
  AuthorCard, 
  RelatedPosts,
  BlogPostHeader
} from '../components';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MessageCircle, ChevronUp } from 'lucide-react';

// Función para estimar el tiempo de lectura
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/).length || 0;
  return Math.ceil(words / wordsPerMinute);
};

// Función para procesar el contenido añadiendo IDs a los encabezados
const processContent = (content: string): string => {
  if (!content) return '';
  
  // Crear un elemento temporal para manipular el HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  // Añadir IDs a los encabezados h2 y h3
  const headings = tempDiv.querySelectorAll('h2, h3');
  headings.forEach((heading, index) => {
    const text = heading.textContent || '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    
    heading.id = id || `section-${index}`;
    
    // Añadir clases para mejorar el estilo
    heading.classList.add('group', 'flex', 'items-center', 'scroll-mt-24');
    
    // Añadir un enlace para facilitar la navegación
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.classList.add('ml-2', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity');
    link.innerHTML = '<svg class="w-5 h-5 text-[#46b1b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>';
    heading.appendChild(link);
  });
  
  // Mejorar la apariencia de las imágenes
  const images = tempDiv.querySelectorAll('img');
  images.forEach(img => {
    // Envolver la imagen en un div con clase y estilos
    const wrapper = document.createElement('div');
    wrapper.className = 'my-8 rounded-xl overflow-hidden shadow-lg';
    img.classList.add('w-full', 'h-auto');
    
    // Si hay un padre que es un enlace, movemos el enlace dentro del wrapper
    if (img.parentElement?.tagName === 'A') {
      const parent = img.parentElement;
      wrapper.appendChild(parent.cloneNode(true));
      parent.replaceWith(wrapper);
    } else {
      img.parentNode?.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }
  });
  
  // Mejorar los bloques de código
  const codeBlocks = tempDiv.querySelectorAll('pre');
  codeBlocks.forEach(pre => {
    pre.classList.add('rounded-lg', 'p-4', 'bg-gray-800', 'text-white', 'overflow-x-auto', 'my-6');
  });
  
  // Mejorar los quotes
  const blockquotes = tempDiv.querySelectorAll('blockquote');
  blockquotes.forEach(quote => {
    quote.classList.add('border-l-4', 'border-[#46b1b9]', 'pl-4', 'italic', 'my-6', 'text-gray-700', 'py-2');
  });
  
  // Mejorar las listas
  const lists = tempDiv.querySelectorAll('ul, ol');
  lists.forEach(list => {
    list.classList.add('my-6', 'pl-6');
    
    // Aplicar estilos a los elementos de la lista
    const items = list.querySelectorAll('li');
    items.forEach(item => {
      item.classList.add('mb-2');
    });
  });
  
  // Eliminar padding o margen adicional que pueda causar sangría no deseada
  const paragraphs = tempDiv.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.classList.add('my-0', 'mx-0');
  });
  
  return tempDiv.innerHTML;
};

const BlogPostPage = () => {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const { post, loading, error } = useBlogPost(slug);
  const { categories, loading: categoriesLoading } = useCategories();
  // Usar la propiedad limit que ahora está definida en BlogFilterParams
  const { posts } = useBlogPosts({ limit: 6, page: 1, per_page: 10 });
  
  const [processedContent, setProcessedContent] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Procesar el contenido cuando el post se carga
  useEffect(() => {
    if (post?.content) {
      setProcessedContent(processContent(post.content));
    }
  }, [post?.content]);
  
  // Mostrar/ocultar botón de scroll top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Tiempo estimado de lectura
  const readTime = post?.content ? calculateReadTime(post.content) : undefined;
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="animate-pulse space-y-6">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-60 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  if (error || !post) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Post no encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              Lo sentimos, el artículo que buscas no existe o ha sido movido.
            </p>
            <Link 
              href="/blog"
              className="inline-block px-4 py-2 bg-[#46b1b9] text-white rounded-md hover:bg-[#22616a] transition-colors"
            >
              Volver al blog
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Barra de navegación superior */}
      
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <article className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Post header */}
              <div className="px-6 pt-6">
                <BlogPostHeader
                  title={post.title}
                  featured_image_url={post.featured_image_url}
                  categories={post.categories}
                  summary={post.summary}
                />
              </div>
              
              {/* Contenido principal simplificado - sin tabla de contenidos */}
              <div className="px-6 pb-8">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="blog-content prose prose-lg"
                  dangerouslySetInnerHTML={{ __html: processedContent || '' }}
                />
                
                {/* Información de autor y estadísticas */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <AuthorCard
                    author={post.author}
                    publishedAt={post.published_at}
                    readTime={readTime}
                  />
                </div>
                
                {/* Sección de etiquetas */}
                {post.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Etiquetas:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link
                          key={tag.id}
                          href={`/blog?tag=${tag.id}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Métricas y acciones del artículo */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-gray-400" />
                      <span>{Math.floor(Math.random() * 1000) + 100} lecturas</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Comentarios (0)</span>
                    </div>
                  </div>
                  
                  <ShareButtons 
                    title={post.title}
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                  />
                </div>
              </div>
            </div>
            
            {/* Artículos relacionados */}
            <RelatedPosts posts={posts} currentPostId={post.id} />
          </article>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <BlogSidebar 
                categories={categories}
                recentPosts={posts.filter(p => p.id !== post.id).slice(0, 5)}
                loading={categoriesLoading}
              />
            </div>
          </aside>
        </div>
      </div>
      
      {/* Botón de volver arriba */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-[#46b1b9] text-white shadow-lg hover:bg-[#22616a] focus:outline-none"
            onClick={scrollToTop}
            aria-label="Volver arriba"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
};

export default BlogPostPage;