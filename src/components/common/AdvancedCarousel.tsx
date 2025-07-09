"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Pause, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { ELEGANT_PLACEHOLDER } from "@/lib/imagePlaceholders";

interface CarouselImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface AdvancedCarouselProps {
  images: CarouselImage[];
  className?: string;
  height?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showCounter?: boolean;
  showFullscreenButton?: boolean;
  enableSwipe?: boolean;
  showPlayPause?: boolean;
  priority?: boolean;
  onImageChange?: (index: number) => void;
}

export default function AdvancedCarousel({
  images,
  className = "",
  height = "400px",
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showCounter = true,
  showFullscreenButton = true,
  enableSwipe = true,
  showPlayPause = false,
  priority = false,
  onImageChange
}: AdvancedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle image loading errors
  const handleImageError = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Use images directly
  const displayImages = images;

  // Memoize for potential future use
  const _imageAspectRatio = useMemo(() => "16/9", []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isFullscreen && displayImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isFullscreen, displayImages.length, autoPlayInterval]);

  // Update drag constraints based on container width
  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const imageWidth = containerWidth;
        const totalWidth = imageWidth * displayImages.length;
        setDragConstraints({
          left: -(totalWidth - containerWidth),
          right: 0
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [displayImages.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % displayImages.length;
    setCurrentIndex(nextIndex);
    onImageChange?.(nextIndex);
  }, [currentIndex, displayImages.length, onImageChange]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
    setCurrentIndex(prevIndex);
    onImageChange?.(prevIndex);
  }, [currentIndex, displayImages.length, onImageChange]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    onImageChange?.(index);
  }, [onImageChange]);

  // Touch/swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enableSwipe) return;
    setTouchStart(e.targetTouches[0].clientX);
  }, [enableSwipe]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enableSwipe) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [enableSwipe]);

  const handleTouchEnd = useCallback(() => {
    if (!enableSwipe || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  }, [enableSwipe, touchStart, touchEnd, goToNext, goToPrevious]);

  // Drag handlers for desktop
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (!enableSwipe) return;
    
    const threshold = 50;
    if (info.offset.x > threshold) {
      goToPrevious();
    } else if (info.offset.x < -threshold) {
      goToNext();
    }
  }, [enableSwipe, goToNext, goToPrevious]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullscreen, goToNext, goToPrevious]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className={`relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 rounded-xl flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-slate-400 text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-3xl"></div>
          </div>
          <p className="text-lg font-medium">Premium Gallery</p>
          <p className="text-sm text-slate-300 mt-1">Images loading...</p>
        </div>
      </div>
    );
  }

  const currentImage = displayImages[currentIndex];

  return (
    <>
      {/* Main Carousel */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-lg ${className}`}
        style={{ height }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image Display */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait" custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              drag={enableSwipe ? "x" : false}
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority={priority && currentIndex <= 2}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  quality={95}
                  placeholder="blur"
                  blurDataURL={ELEGANT_PLACEHOLDER}
                  onLoad={() => setIsLoading(false)}
                  onError={handleImageError}
                />
                
                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
              </div>
              
              {/* Preload next and previous images for instant transitions */}
              {displayImages.length > 1 && (
                <>
                  {/* Preload next image */}
                  <Image
                    src={displayImages[(currentIndex + 1) % displayImages.length]?.url}
                    alt="preload"
                    width={1}
                    height={1}
                    style={{ display: 'none' }}
                    priority={false}
                  />
                  {/* Preload previous image */}
                  {currentIndex > 0 && (
                    <Image
                      src={displayImages[(currentIndex - 1 + displayImages.length) % displayImages.length]?.url}
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

          {/* Loading overlay with premium shimmer animation */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative">
                {/* Premium loading spinner */}
                <div className="w-12 h-12 relative">
                  <div className="absolute inset-0 border-4 border-neutral-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
              </div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" 
                     style={{ animationDelay: '0.7s', animationDuration: '2s' }}></div>
              </div>
            </motion.div>
          )}

          {/* Gradient overlays removed for cleaner look */}
        </div>

        {/* Enhanced Navigation Buttons */}
        {displayImages.length > 1 && (
          <>
            <motion.button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 shadow-lg hover:shadow-xl group carousel-nav-button"
              aria-label="Previous image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-800 p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20 shadow-lg hover:shadow-xl group carousel-nav-button"
              aria-label="Next image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </>
        )}

        {/* Enhanced Top Controls */}
        <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-center z-20">
          {/* Counter */}
          {showCounter && displayImages.length > 1 && (
            <div className="bg-white/90 text-neutral-800 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg">
              {currentIndex + 1} / {displayImages.length}
            </div>
          )}

          {/* Control buttons */}
          <div className="flex gap-2">
            {/* Play/Pause */}
            {showPlayPause && displayImages.length > 1 && (
              <motion.button
                onClick={togglePlayPause}
                className="bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </motion.button>
            )}

            {/* Fullscreen */}
            {showFullscreenButton && (
              <motion.button
                onClick={() => setIsFullscreen(true)}
                className="bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg"
                aria-label="View fullscreen"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize2 className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Enhanced Bottom Controls */}
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 z-20">
          {/* Image Caption */}
          {currentImage.caption && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 text-neutral-800 px-4 py-2 rounded-lg text-sm backdrop-blur-sm mb-3 shadow-lg"
            >
              {currentImage.caption}
            </motion.div>
          )}

          {/* Enhanced Thumbnail Navigation */}
          {showThumbnails && displayImages.length > 1 && (
            <div className="flex justify-center">
              <div className="flex gap-1.5 md:gap-2 bg-white/90 p-2 rounded-lg backdrop-blur-sm overflow-x-auto max-w-full shadow-lg">
                {displayImages.map((image, index) => (
                  <motion.button
                    key={image.id}
                    onClick={() => goToIndex(index)}
                    className={`relative w-10 h-7 md:w-12 md:h-8 rounded overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                      index === currentIndex
                        ? 'border-primary-600 shadow-md scale-110'
                        : 'border-neutral-300 hover:border-primary-400'
                    }`}
                    whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-primary-600/20" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Dot indicators */}
          {!showThumbnails && displayImages.length > 1 && (
            <div className="flex justify-center gap-2">
              {displayImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-white/60 hover:bg-white/80 w-2'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen image */}
            <div className="relative w-full h-full">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Fullscreen navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Fullscreen counter */}
            <div className="absolute top-6 left-6 bg-black/50 text-white px-4 py-2 rounded-lg text-lg backdrop-blur-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>

            {/* Fullscreen thumbnails */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex gap-2 bg-black/50 p-3 rounded-lg backdrop-blur-sm overflow-x-auto max-w-screen-sm">
                  {displayImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToIndex(index)}
                      className={`relative w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        index === currentIndex
                          ? 'border-white scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
