"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { ELEGANT_PLACEHOLDER } from "@/lib/imagePlaceholders";

interface PropertyImage {
  id: string;
  url: string;
  alt: string;
}

interface PropertyCarouselProps {
  images: PropertyImage[];
  className?: string;
  height?: string;
  propertyTitle: string;
  onImageClick?: (index: number) => void;
  priority?: boolean;
}

export default function PropertyCarousel({
  images,
  className = "",
  height = "h-64 md:h-72",
  propertyTitle,
  onImageClick,
  priority = false
}: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, images.length]);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToIndex = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onImageClick?.(currentIndex);
  }, [currentIndex, onImageClick]);

  // Enhanced touch handling for better mobile performance
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [touchStart, touchEnd, currentIndex, images.length]);

  // Enhanced drag handling with better constraints
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 75; // Increased threshold for more intentional swipes
    const velocity = Math.abs(info.velocity.x);
    
    // Consider velocity for more responsive swipes
    if ((info.offset.x > threshold || velocity > 500) && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if ((info.offset.x < -threshold || velocity > 500) && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className={`relative ${height} bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center ${className} rounded-lg overflow-hidden`}>
        <div className="text-slate-400 text-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
          <p className="text-sm font-medium">Beautiful Property Images</p>
          <p className="text-xs text-slate-300 mt-1">Coming Soon</p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div 
      ref={containerRef}
      className={`relative ${height} overflow-hidden bg-neutral-200 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1], // Optimized for 60fps
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.02}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={currentImage.url}
            alt={currentImage.alt || propertyTitle}
            fill
            className="object-cover"
            priority={priority && currentIndex <= 1} // Prioritize first 2 images
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85} // Balanced quality and performance
            placeholder="blur"
            blurDataURL={ELEGANT_PLACEHOLDER}
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              console.error('Image failed to load:', currentImage.url);
              setIsLoading(false);
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Preload adjacent images for instant transitions */}
          {images.length > 1 && (
            <>
              {/* Preload next image */}
              {currentIndex < images.length - 1 && (
                <Image
                  src={images[currentIndex + 1]?.url}
                  alt="preload"
                  width={1}
                  height={1}
                  style={{ display: 'none' }}
                  priority={false}
                />
              )}
              {/* Preload previous image */}
              {currentIndex > 0 && (
                <Image
                  src={images[currentIndex - 1]?.url}
                  alt="preload"
                  width={1}
                  height={1}
                  style={{ display: 'none' }}
                  priority={false}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Loading overlay with elegant shimmer effect */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center overflow-hidden"
        >
          <div className="relative">
            {/* Elegant loading animation */}
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border-2 border-slate-200 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
          </div>
          
          {/* Background shimmer pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
                 style={{ animationDelay: '0.5s', animationDuration: '1.5s' }}></div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons - Only show when navigation is possible */}
      {images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-700" />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-neutral-700" />
            </button>
          )}
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => goToIndex(idx, e)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === idx ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {currentIndex + 1}/{images.length}
        </div>
      )}

      {/* Gradient overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
