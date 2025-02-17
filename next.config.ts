import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  // Asegúrate de que las variables de entorno estén disponibles en el cliente
  
  // Opcional: Configuración para manejar imágenes de dominios externos
  images: {
    domains: ['api.scieluxe.com', 'localhost', 'scienceluxe.blob.core.windows.net','static.scieluxe.com', 'media.licdn.com'],
  },
};

export default nextConfig;
