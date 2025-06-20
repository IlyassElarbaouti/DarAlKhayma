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
  // Fetch properties from Sanity with error handling
  let properties: Property[] = [];
  try {
    properties = await getAllProperties();
  } catch (error) {
    console.error('Failed to fetch properties from Sanity:', error);
    // Return empty array to prevent build failure
    properties = [];
  }

  // Generate structured data for SEO only if properties exist
  const structuredData = properties.length > 0 ? {
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
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dar-al-khayma.com'}/properties/${property.slug}`,
        "name": property.title,
        "description": property.shortDescription || property.description,
        "image": property.images?.[0]?.url,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.location?.city,
          "addressRegion": property.location?.region,
          "addressCountry": property.location?.country || "Morocco"
        },
        ...(property.location?.coordinates && {
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": property.location.coordinates.lat,
            "longitude": property.location.coordinates.lng
          }
        }),
        "priceRange": property.price ? `${property.price.amount} ${property.price.currency} per ${property.price.period}` : "Contact for pricing",
        "amenityFeature": property.amenities?.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity.name
        })) || []
      }
    }))
  } : null;  return (
    <PageWithHeaderPadding>
      <PropertiesClient properties={properties} />

      {/* Structured Data - only render if we have properties */}
      {structuredData && (
        <Script
          id="properties-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </PageWithHeaderPadding>
  );
}
