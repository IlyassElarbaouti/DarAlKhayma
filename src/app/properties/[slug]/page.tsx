import { notFound } from "next/navigation";
import { PageWithHeaderPadding } from "@/components/layout/PageLayout";
import { getPropertyBySlug, getAllProperties } from "@/lib/sanityService";
import PropertyPageClient from "./PropertyPageClient";

// Enable faster revalidation for fresh images
export const revalidate = 30;
// Force dynamic rendering for updated content
export const dynamic = 'force-dynamic';

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  
  // Fetch property data from Sanity
  const property = await getPropertyBySlug(slug);
  
  if (!property) {
    notFound();
  }

  return (
    <PageWithHeaderPadding>
      <PropertyPageClient property={property} />
    </PageWithHeaderPadding>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const properties = await getAllProperties();
    return properties
      .filter(property => property.slug)
      .map((property) => ({
        slug: property.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

