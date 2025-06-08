"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedDestinations } from "@/lib/sanityService";
import { SanityDestination } from "@/types/sanity";
import { urlFor } from "@/lib/sanity";

// Mock video URLs for destinations (using placeholder videos that should work)
const destinationVideos: { [key: string]: string } = {
  'marrakech': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'casablanca': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'fes': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'essaouira': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'agadir': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'chefchaouen': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
};

export default function VideoDestinationsSection() {
  const [destinations, setDestinations] = useState<SanityDestination[]>([]);
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
        const featuredDestinations = await getFeaturedDestinations();
        setDestinations(featuredDestinations.slice(0, 5)); // Show max 5 destinations
      } catch (error) {
        console.error('Error loading destinations:', error);
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  // Auto-advance to next destination every 8 seconds
  useEffect(() => {
    if (destinations.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
        setVideoLoaded(false); // Reset video loading for smooth transition
      }, 8000);
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
  const videoUrl = currentDestination.videoUrl || 
                  destinationVideos[currentDestination.slug.current.toLowerCase()] || 
                  destinationVideos['marrakech'];
  
  const imageUrl = currentDestination.image ? 
    urlFor(currentDestination.image).width(1920).height(1080).url() : 
    'https://images.unsplash.com/photo-1539650116574-75c0c6d0cf5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  return (
    <section className="relative w-full h-screen overflow-hidden">      {/* Video Background */}
      {isClient && videoUrl && (
        <video
          key={currentIndex} // Force re-render for new videos
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Fallback Image Background */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center ${
          isClient && videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url('${imageUrl}')` }}
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
          See all {destinations.length * 10} destinations
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}