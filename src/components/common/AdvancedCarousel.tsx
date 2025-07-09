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

  // Memoize for potential future use
  const _imageAspectRatio = useMemo(() => "16/9", []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isFullscreen && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
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
  }, [isPlaying, isFullscreen, images.length, autoPlayInterval]);

  // Update drag constraints based on container width
  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const imageWidth = containerWidth;
        const totalWidth = imageWidth * images.length;
        setDragConstraints({
          left: -(totalWidth - containerWidth),
          right: 0
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [images.length]);

  // Navigation functions
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    onImageChange?.(nextIndex);
  }, [currentIndex, images.length, onImageChange]);

  const goToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    onImageChange?.(prevIndex);
  }, [currentIndex, images.length, onImageChange]);

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

  if (!images || images.length === 0) {
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

  const currentImage = images[currentIndex];

  return (
    <>
      {/* Main Carousel */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl bg-neutral-900 ${className}`}
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                duration: 0.25,
                ease: [0.25, 0.1, 0.25, 1], // Optimized easing for 60fps
                opacity: { duration: 0.2 }
              }}
              drag={enableSwipe ? "x" : false}
              dragConstraints={dragConstraints}
              dragElastic={0.02}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                className="object-cover"
                priority={priority && currentIndex <= 2} // Prioritize first 3 images
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={90} // Higher quality for main carousel
                placeholder="blur"
                blurDataURL={ELEGANT_PLACEHOLDER}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
              
              {/* Preload next and previous images for instant transitions */}
              {images.length > 1 && (
                <>
                  {/* Preload next image */}
                  <Image
                    src={images[(currentIndex + 1) % images.length]?.url}
                    alt="preload"
                    width={1}
                    height={1}
                    style={{ display: 'none' }}
                    priority={false}
                  />
                  {/* Preload previous image */}
                  {currentIndex > 0 && (
                    <Image
                      src={images[(currentIndex - 1 + images.length) % images.length]?.url}
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
              className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center overflow-hidden"
            >
              <div className="relative">
                {/* Premium loading spinner */}
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 border-3 border-slate-200 rounded-full"></div>
                  <div className="absolute inset-0 border-3 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
              </div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" 
                     style={{ animationDelay: '0.7s', animationDuration: '2s' }}></div>
              </div>
            </motion.div>
          )}

          {/* Gradient overlays for better UI visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          {/* Counter */}
          {showCounter && images.length > 1 && (
            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Control buttons */}
          <div className="flex gap-2">
            {/* Play/Pause */}
            {showPlayPause && images.length > 1 && (
              <button
                onClick={togglePlayPause}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}

            {/* Fullscreen */}
            {showFullscreenButton && (
              <button
                onClick={() => setIsFullscreen(true)}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label="View fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          {/* Image Caption */}
          {currentImage.caption && (
            <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm mb-4">
              {currentImage.caption}
            </div>
          )}

          {/* Thumbnail Navigation */}
          {showThumbnails && images.length > 1 && (
            <div className="flex justify-center">
              <div className="flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-sm overflow-x-auto max-w-full">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToIndex(index)}
                    className={`relative w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
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
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dot indicators (alternative to thumbnails) */}
          {!showThumbnails && images.length > 1 && (
            <div className="flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
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
            {images.length > 1 && (
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
              {currentIndex + 1} / {images.length}
            </div>

            {/* Fullscreen thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex gap-2 bg-black/50 p-3 rounded-lg backdrop-blur-sm overflow-x-auto max-w-screen-sm">
                  {images.map((image, index) => (
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
