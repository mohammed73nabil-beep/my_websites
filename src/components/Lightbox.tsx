import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoplay) {
      timer = setInterval(next, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoplay, next]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      {/* Controls Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsAutoplay(!isAutoplay); }}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"
          >
            {isAutoplay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <span className="text-white/60 text-sm font-medium tracking-widest">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.1, x: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsAutoplay(false); prev(); }}
          className="absolute left-4 md:-left-20 p-4 bg-white/5 hover:bg-amber-500 hover:text-black rounded-full text-white transition-all border border-white/10 group active:scale-90"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsAutoplay(false); next(); }}
          className="absolute right-4 md:-right-20 p-4 bg-white/5 hover:bg-amber-500 hover:text-black rounded-full text-white transition-all border border-white/10 group active:scale-90"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Bar for Autoplay */}
      {isAutoplay && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-amber-500"
          />
        </div>
      )}
    </motion.div>
  );
}
