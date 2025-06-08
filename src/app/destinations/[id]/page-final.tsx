import { notFound } from "next/navigation";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDestinationBySlug, getPropertiesByCity } from "@/lib/sanityService";
import DestinationClient from "./DestinationClient";

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  // Fetch destination data from Sanity
  const destination = await getDestinationBySlug(params.id);
  
  if (!destination) {
    notFound();
  }

  // Fetch properties for this destination
  const properties = await getPropertiesByCity(destination.name);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <DestinationClient 
          destination={destination} 
          properties={properties}
        />
      </main>
      
      <Footer />

      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": destination.name,
            "description": destination.description,
            "image": destination.image?.url,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": destination.name,
              "addressRegion": destination.region,
              "addressCountry": "Morocco"
            },
            "touristType": ["Cultural Tourism", "Luxury Travel", "Adventure Tourism"],
            "availableLanguage": ["Arabic", "French", "English"],
            "currenciesAccepted": "MAD",
            "hasMap": `https://dar-al-khayma.com/destinations/${params.id}`,
            "sameAs": [
              `https://en.wikipedia.org/wiki/${destination.name}`,
              `https://www.visitmorocco.com/destinations/${params.id}`
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
          })
        }}
      />
    </div>
  );
}

// Generate static params for destinations (we'll fetch from Sanity in production)
export async function generateStaticParams() {
  // For now, return common destination slugs
  // In production, this should fetch from Sanity
  return [
    { id: 'marrakech' },
    { id: 'casablanca' },
    { id: 'fes' },
    { id: 'rabat' },
  ];
}