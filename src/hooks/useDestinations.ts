"use client";

import { useState, useEffect } from 'react';
import { getAllDestinations } from '@/lib/sanityService';
import { Destination } from '@/types/sanity';

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await getAllDestinations();
        
        if (isMounted) {
          setDestinations(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch destinations');
          console.error('Error fetching destinations:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDestinations();

    return () => {
      isMounted = false;
    };
  }, []);

  return { destinations, loading, error };
}
