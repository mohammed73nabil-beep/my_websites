import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

export default function DynamicHero() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const fallbackImages = [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000'
      ];
      
      try {
        const res = await api.get('/projects');
        if (Array.isArray(res.data)) {
          const projectImages = res.data
            .map((p: any) => p.image)
            .filter((img: string) => img && img.length > 50); // Base64 or URL
          
          if (projectImages.length > 0) {
            setImages(projectImages);
          } else {
            setImages(fallbackImages);
          }
        } else {
          setImages(fallbackImages);
        }
      } catch (error) {
        console.error('Error fetching hero images:', error);
        setImages(fallbackImages);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={images[currentIndex]} 
            alt="Dynamic Backdrop" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)]"></div>
      
      {/* Animated Glow Effect */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"
      />
    </div>
  );
}
