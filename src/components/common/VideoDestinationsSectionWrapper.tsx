"use client";

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const VideoDestinationsSection = dynamic(
  () => import('./VideoDestinationsSection'),
  { 
    ssr: false,
    loading: () => (
      <section className="relative min-h-screen bg-black">
        <div className="absolute inset-0 z-10">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-white animate-pulse">
                <div className="h-16 bg-white/20 rounded w-96 mx-auto mb-4"></div>
                <div className="w-24 h-0.5 bg-orange-400 mx-auto"></div>
              </div>
            </div>
            <div className="flex-1 px-8 pb-16">
              <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[500px] bg-white/10 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
      </section>
    )
  }
);

export default function VideoDestinationsSectionWrapper() {
  return <VideoDestinationsSection />;
}
