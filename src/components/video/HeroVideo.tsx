"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

export default function HeroVideo({ videoSrc, posterSrc, className = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);  useEffect(() => {
    if (!isMounted) return;
    
    const video = videoRef.current;
    if (!video) return;

    let timeoutId: NodeJS.Timeout;
    let mounted = true;

    const handleLoadedData = () => {
      if (!mounted) return;
      setIsLoaded(true);
      setHasError(false);
      clearTimeout(timeoutId);
      
      // Try to autoplay after a short delay
      setTimeout(() => {
        if (video && mounted) {
          video.play().then(() => {
            if (mounted) setIsPlaying(true);
          }).catch(() => {
            // Autoplay failed, show controls
            if (mounted) {
              setShowControls(true);
              setIsPlaying(false);
            }
          });
        }
      }, 200);
    };

    const handleCanPlayThrough = () => {
      if (!mounted) return;
      setIsLoaded(true);
      setHasError(false);
      clearTimeout(timeoutId);
    };

    const handleError = (e: Event) => {
      if (!mounted) return;
      console.error('Video failed to load:', videoSrc, e);
      setHasError(true);
      setIsLoaded(true);
      setShowControls(true);
      setIsPlaying(false);
      clearTimeout(timeoutId);
    };

    const handleLoadStart = () => {
      if (!mounted) return;
      setIsLoaded(false);
      setHasError(false);
      
      // Set a timeout to prevent infinite loading
      timeoutId = setTimeout(() => {
        if (mounted) {
          console.warn('Video loading timeout for:', videoSrc);
          setHasError(true);
          setIsLoaded(true);
          setShowControls(true);
          setIsPlaying(false);
        }
      }, 15000); // 15 second timeout
    };

    const handlePlay = () => {
      if (mounted) setIsPlaying(true);
    };

    const handlePause = () => {
      if (mounted) setIsPlaying(false);
    };

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Force load the video on initial mount
    video.load();
    
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoSrc, isMounted]);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((err) => {
        console.error('Play failed:', err);
        setShowControls(true);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const retryLoad = () => {
    const video = videoRef.current;
    if (!video) return;
    
    setHasError(false);
    setIsLoaded(false);
    setIsPlaying(false);
    video.load();
  };

  // Don't render anything until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${posterSrc}')` }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={posterSrc}
        loop
        playsInline
        muted={isMuted}
        preload="auto"
        controls={false}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State - Show poster image as fallback */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{ backgroundImage: `url('${posterSrc}')` }}
        >
          <div className="bg-black/70 text-white p-4 rounded-lg text-center backdrop-blur-sm">
            <p className="text-sm mb-3">Video failed to load</p>
            <button
              onClick={retryLoad}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}      {/* Video Controls */}
      <AnimatePresence>
        {showControls && isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 right-6 flex items-center gap-3"
          >
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
