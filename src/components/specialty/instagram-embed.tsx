'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface InstagramEmbedProps {
  postId: string;
  className?: string;
  width?: number;
  height?: number;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  postId,
  className = '',

}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Cargar el script de Instagram si no está presente
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  if (hasError) {
    return (
      <div className={`relative rounded-2xl shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">No se pudo cargar el contenido de Instagram</p>
          <a
            href={`https://www.instagram.com/p/${postId}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#E4405F] text-white rounded-lg hover:bg-[#C13584] transition-colors"
          >
            Ver en Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl shadow-2xl overflow-hidden bg-white ${className}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4405F]"></div>
        </div>
      )}
      
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`https://www.instagram.com/p/${postId}/`}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: '99.375%'
        }}
        onLoad={handleLoad}
        onError={handleError}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={`https://www.instagram.com/p/${postId}/`}
            style={{
              background: '#FFFFFF',
              lineHeight: 0,
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%'
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver esta publicación en Instagram
          </a>
        </div>
      </blockquote>
    </motion.div>
  );
};

// Declaración de tipos para window.instgrm
declare global {
  interface Window {
    instgrm: {
      Embeds: {
        process(): void;
      };
    };
  }
}

export default InstagramEmbed;
