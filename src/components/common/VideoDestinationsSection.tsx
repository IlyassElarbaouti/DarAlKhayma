"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedDestinations, getAllDestinations } from "@/lib/sanityService";
import { SanityDestination } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

// Drone video URLs for destinations from customer requirements
const destinationVideos: { [key: string]: string } = {
  'tetouane': 'https://www.youtube.com/watch?v=SszOg1IdlJw',
  'tetouan': 'https://www.youtube.com/watch?v=37xHRY8Mrkw',
  'casablanca': 'https://www.youtube.com/watch?v=0FVMoUD9x-Y',
  'casa': 'https://www.youtube.com/watch?v=d9E1llJlMh4',
  'agadir': 'https://www.youtube.com/watch?v=LpINTfhki-w',
  'marrakech': 'https://www.youtube.com/watch?v=6udF6NeUeac',
  'essaouira': 'https://www.youtube.com/watch?v=6dmz1bIpQHk',
  'tanger': 'https://www.youtube.com/watch?v=WfEN8wxkJLc',
  'rabat': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // Placeholder for Rabat
};

export default function VideoDestinationsSection() {
  const [destinations, setDestinations] = useState<SanityDestination[]>([]);
  const [totalDestinations, setTotalDestinations] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const [featuredDestinations, allDestinations] = await Promise.all([
          getFeaturedDestinations(),
          getAllDestinations()
        ]);
        
        setTotalDestinations(allDestinations.length);
        
        // Prioritize destinations that have videos (either videoUrl or in our destinationVideos mapping)
        const destinationsWithVideos = featuredDestinations
          .map(dest => ({
            ...dest,
            hasVideo: !!(dest.videoUrl || destinationVideos[dest.slug.current.toLowerCase()]),
            videoSource: dest.videoUrl ? 'sanity' : 'predefined'
          }))
          .sort((a, b) => {
            // First prioritize by having video
            if (a.hasVideo && !b.hasVideo) return -1;
            if (!a.hasVideo && b.hasVideo) return 1;
            
            // Then prioritize Sanity videos over predefined ones
            if (a.hasVideo && b.hasVideo) {
              if (a.videoSource === 'sanity' && b.videoSource === 'predefined') return -1;
              if (a.videoSource === 'predefined' && b.videoSource === 'sanity') return 1;
            }
            
            // Keep original order for same priority
            return 0;
          })
          .slice(0, 5); // Show max 5 destinations
        
        console.log('Loaded destinations with video priority:', destinationsWithVideos.map(d => ({
          name: d.name,
          hasVideo: d.hasVideo,
          videoSource: d.videoSource,
          videoUrl: d.videoUrl || destinationVideos[d.slug.current.toLowerCase()]
        })));
        
        setDestinations(destinationsWithVideos);
      } catch (error) {
        console.error('Error loading destinations:', error);
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  // Auto-advance to next destination every 12 seconds
  useEffect(() => {
    if (destinations.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
        setVideoLoaded(false); // Reset video loading for smooth transition
      }, 12000);
      return () => clearInterval(interval);
    }
  }, [destinations.length]);

  const goToDestination = (index: number) => {
    setCurrentIndex(index);
    setVideoLoaded(false);
  };
  const _nextDestination = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    setVideoLoaded(false);
  };

  const _prevDestination = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    setVideoLoaded(false);
  };

  if (loading) {
    return (
      <section className="relative w-full h-screen bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white animate-pulse">
            <div className="h-12 bg-white/20 rounded w-96 mx-auto mb-4"></div>
            <div className="w-24 h-0.5 bg-orange-400 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || destinations.length === 0) {
    return (
      <section className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Trending destinations
          </h2>
          <div className="w-24 h-0.5 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Discover Morocco&apos;s most captivating destinations
          </p>
          <Link
            href="/destinations"
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-light tracking-wide transition-all duration-200 rounded-lg"
          >
            View All Destinations
          </Link>
        </div>
      </section>
    );
  }

  const currentDestination = destinations[currentIndex];
  
  // Enhanced video URL resolution with better fallback
  const getVideoUrl = (destination: SanityDestination) => {
    // First priority: Sanity videoUrl (most up-to-date)
    if (destination.videoUrl) {
      console.log(`Using Sanity video for ${destination.name}:`, destination.videoUrl);
      return destination.videoUrl;
    }
    
    // Second priority: Predefined videos by slug
    const predefinedVideo = destinationVideos[destination.slug.current.toLowerCase()];
    if (predefinedVideo) {
      console.log(`Using predefined video for ${destination.name}:`, predefinedVideo);
      return predefinedVideo;
    }
    
    // Fallback: Default Marrakech video
    console.log(`Using fallback video for ${destination.name}`);
    return destinationVideos['marrakech'];
  };

  // Check if URL is a YouTube video
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${videoIdMatch[1]}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`;
    }
    return url;
  };
  
  const videoUrl = getVideoUrl(currentDestination);
  
  const imageUrl = currentDestination.image ? 
    urlFor(currentDestination.image).width(1920).height(1080).quality(85).url() : 
    'https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Preload next destination images and videos for smoother transitions */}
      {destinations.length > 1 && (
        <>
          <link
            rel="preload"
            as="image"
            href={destinations[(currentIndex + 1) % destinations.length]?.image ? 
              urlFor(destinations[(currentIndex + 1) % destinations.length].image).width(1920).height(1080).quality(85).url() :
              'https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
            }
          />
          {/* Only preload non-YouTube videos */}
          {(() => {
            const nextVideoUrl = getVideoUrl(destinations[(currentIndex + 1) % destinations.length]);
            return !isYouTubeUrl(nextVideoUrl) && (
              <link
                rel="preload"
                as="video"
                href={nextVideoUrl}
              />
            );
          })()}
        </>
      )}      {/* Video Background with better loading strategy */}
      {isClient && videoUrl && (
        <>
          {isYouTubeUrl(videoUrl) ? (
            // YouTube iframe embed with proper scaling
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                key={`${currentIndex}-${videoUrl}`}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src={getYouTubeEmbedUrl(videoUrl)}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ 
                  willChange: 'transform',
                  width: 'max(100vw, calc(100vh * 16/9))',
                  height: 'max(100vh, calc(100vw * 9/16))',
                  minWidth: '100%',
                  minHeight: '100%'
                }}
                onLoad={() => setVideoLoaded(true)}
                onError={() => {
                  console.error(`Failed to load YouTube video: ${videoUrl}`);
                  setVideoLoaded(false);
                }}
              />
            </div>
          ) : (
            // Regular video element for direct video files
            <video
              key={`${currentIndex}-${videoUrl}`}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => {
                console.error(`Failed to load video: ${videoUrl}`);
                setVideoLoaded(false);
              }}
              style={{ 
                willChange: 'transform',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}

      {/* Fallback Image Background with optimized loading */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${
          isClient && videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          willChange: 'opacity' // Optimize for opacity transitions
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />      {/* Top Right - Trending destinations title */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 text-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light italic tracking-wide">
          Trending destinations
        </h2>
      </div>{/* Left Sidebar - Destination List */}
      <div className="absolute left-8 bottom-8 text-white">
        <div className="space-y-6">
          {destinations.map((destination, index) => (
            <motion.button
              key={destination._id}
              onClick={() => goToDestination(index)}
              className={`block text-left transition-all duration-300 ${
                index === currentIndex 
                  ? 'text-white text-2xl md:text-3xl font-light' 
                  : 'text-white/60 text-lg md:text-xl font-light hover:text-white/80'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >              <div className="flex items-center gap-3">
                {index === currentIndex && (
                  <div className="w-8 h-px bg-white"></div>
                )}
                <span>{destination.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>      {/* Bottom Right - See all destinations link */}
      <div className="absolute bottom-8 right-8 text-white">
        <Link
          href="/destinations"
          className="text-sm md:text-base font-light tracking-wide hover:text-orange-400 transition-colors duration-300 flex items-center gap-2"
        >
          See all {totalDestinations > 0 ? totalDestinations : destinations.length} destinations
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}