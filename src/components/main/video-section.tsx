// src/components/main/video-section.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Loader2 } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = "https://static.scieluxe.com/cidon/%C2%BFCu%C3%A1ndo%20el%20autocuidado%20es%20el%20mayor%20acto%20de%20amor_%20Valeria%20y%20Romel%20confiaron%20en%20CIATOB.%20%20-%20Compressed%20with%20FlexClip.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    return () => video.removeEventListener('canplaythrough', handleCanPlayThrough);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Testimonios que Inspiran
          </h2>
          <div className="w-24 h-1 bg-[#46b1b9] mx-auto rounded-full" />
        </motion.div>

        <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
          {/* Pre-loader */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900 text-white"
              >
                <Loader2 className="w-12 h-12 animate-spin text-[#46b1b9] mb-4" />
                <p className="text-sm font-medium animate-pulse">Cargando experiencia...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Custom Controls Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 px-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 shadow-xl">
              <button 
                onClick={restartVideo}
                className="p-2 text-white hover:text-[#46b1b9] transition-colors rounded-full hover:bg-white/10"
                title="Reiniciar"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg"
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>

              <button 
                onClick={toggleMute}
                className="p-2 text-white hover:text-[#46b1b9] transition-colors rounded-full hover:bg-white/10"
                title={isMuted ? "Activar Sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Play Button Overlay (shows when paused) */}
          <AnimatePresence>
            {!isPlaying && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={togglePlay}
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-black/20"
              >
                <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
