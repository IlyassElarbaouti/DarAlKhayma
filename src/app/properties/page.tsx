import Script from "next/script";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import PropertiesClient from "@/components/property/PropertiesClient";
import { getAllProperties } from "@/lib/sanityService";
import { Property } from "@/types";

export const metadata = {
  title: "Premium Properties | Dar Al Khayma",
  description: "Discover our collection of luxury properties across Morocco. Find your perfect rental in Marrakech, Casablanca, Fes, and other premier destinations.",
};

export default async function PropertiesPage() {
  // Fetch properties from Sanity
  let properties: Property[] = [];
  try {
    properties = await getAllProperties();
  } catch (error) {
    console.error('Failed to fetch properties from Sanity:', error);
    properties = [];
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Premium Properties",
    "description": "Luxury property rentals across Morocco",
    "numberOfItems": properties.length,
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Accommodation",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/properties/${property.slug}`,
        "name": property.title,
        "description": property.shortDescription,
        "image": property.images[0]?.url,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.location.city,
          "addressRegion": property.location.region,
          "addressCountry": property.location.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": property.location.coordinates.lat,
          "longitude": property.location.coordinates.lng
        },
        "priceRange": `${property.price.amount} ${property.price.currency} per ${property.price.period}`,
        "amenityFeature": property.amenities.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity.name
        }))
      }
    }))
  };
  return (
    <PageWithHeaderPadding>
      <PropertiesClient properties={properties} />

      {/* Structured Data */}
      <Script
        id="properties-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </PageWithHeaderPadding>
  );
}
