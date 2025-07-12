import { notFound } from "next/navigation";
import Script from "next/script";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { getDestinationBySlug, getPropertiesByCity, getAllDestinations } from "@/lib/sanityService";
import DestinationClient from "./DestinationClient";

interface DestinationPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Enable ISR for new destinations
export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

export default async function DestinationPage({ params }: DestinationPageProps) {
  // Await the params
  const { id } = await params;
  
  // Fetch destination data from Sanity
  const destination = await getDestinationBySlug(id);
  
  if (!destination) {
    notFound();
  }

  // Fetch properties for this destination
  const properties = await getPropertiesByCity(destination.name);
  return (
    <PageWithHeaderPadding>
      <DestinationClient 
        destination={destination} 
        properties={properties}
      />

      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",            "name": destination.name,
            "description": destination.description,
            "image": destination.image?.url,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": destination.name,
              "addressRegion": destination.region,
              "addressCountry": "Morocco"
            },
            "touristType": ["Cultural Tourism", "Luxury Travel", "Adventure Tourism"],
            "availableLanguage": ["Arabic", "French", "English"],            "currenciesAccepted": "MAD",
            "hasMap": `https://dar-al-khayma.com/destinations/${id}`,
            "sameAs": [
              `https://en.wikipedia.org/wiki/${destination.name}`,
              `https://www.visitmorocco.com/destinations/${id}`
            ],
            "containsPlace": properties.map(property => ({
              "@type": "LodgingBusiness",
              "name": property.title,
              "description": property.shortDescription,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": property.location.city,
                "addressRegion": property.location.region,
                "addressCountry": property.location.country
              },
              "priceRange": `${property.price.amount} ${property.price.currency}`,
              "starRating": {
                "@type": "Rating",
                "ratingValue": property.rating?.average || 4.5
              }
            }))
          })        }}
      />
    </PageWithHeaderPadding>
  );
}

// Generate static params for destinations
export async function generateStaticParams() {
  try {
    // Fetch all destinations from Sanity
    const destinations = await getAllDestinations();
    return destinations
      .filter((destination) => destination.slug)
      .map((destination) => ({
        id: destination.slug,
      }));
  } catch (error) {
    console.error('Error generating static params for destinations:', error);
    // Fallback to common destination slugs
    return [
      { id: 'marrakech' },
      { id: 'casablanca' },
      { id: 'fes' },
      { id: 'rabat' },
    ];
  }
}
