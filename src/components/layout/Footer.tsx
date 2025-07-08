"use client";

import { useEffect, useState } from "react";
import { getFeaturedDestinations } from "@/lib/sanityService";
import { SanityDestination } from "@/types/sanity";
import FooterClient from "./FooterClient";

interface FooterProps {
  destinations?: SanityDestination[];
}

export default function Footer({ destinations }: FooterProps) {
  const [footerDestinations, setFooterDestinations] = useState<SanityDestination[]>(destinations || []);
  const [loading, setLoading] = useState(!destinations);

  useEffect(() => {
    if (!destinations) {
      async function loadDestinations() {
        try {
          const fetchedDestinations = await getFeaturedDestinations();
          setFooterDestinations(fetchedDestinations);
        } catch (error) {
          console.error('Error fetching destinations for footer:', error);
          setFooterDestinations([]);
        } finally {
          setLoading(false);
        }
      }
      
      loadDestinations();
    }
  }, [destinations]);

  if (loading) {
    // Show a simple loading state or the footer with static destinations
    return <FooterClient destinations={[]} />;
  }

  return <FooterClient destinations={footerDestinations} />;
}
