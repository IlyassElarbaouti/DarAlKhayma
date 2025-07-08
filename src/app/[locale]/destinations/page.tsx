"use client";

import { motion } from "framer-motion";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import DestinationsGrid from "@/components/destinations/DestinationsGrid";
import { SanityDestination } from "@/types/sanity";
import { useState, useEffect } from "react";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<SanityDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const response = await fetch('/api/destinations');
        const data = await response.json();
        
        if (data.success) {
          setDestinations(data.data);
        } else {
          setError('Failed to load destinations');
        }
      } catch (error) {
        console.error('Error loading destinations:', error);
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  if (loading) {
    return (
      <PageWithHeaderPadding>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageWithHeaderPadding>
    );
  }

  if (error) {
    return (
      <PageWithHeaderPadding>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </PageWithHeaderPadding>
    );
  }

  return (
    <PageWithHeaderPadding>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Explore Morocco
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover Morocco&apos;s most beautiful destinations with our premium accommodations. 
              From the bustling streets of Marrakech to the serene beaches of Essaouira, 
              find your perfect Moroccan getaway.
            </p>
          </motion.div>

          {/* Destinations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {destinations.length > 0 ? (
              <DestinationsGrid destinations={destinations} />
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No destinations available at the moment.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageWithHeaderPadding>
  );
}
