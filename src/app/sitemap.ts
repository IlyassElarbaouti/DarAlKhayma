import { MetadataRoute } from 'next'
import { getAllProperties } from '@/lib/sanityService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dar-al-khayma.com'
    // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Destination pages
  const destinations = ['marrakech', 'casablanca', 'fez', 'essaouira', 'chefchaouen']
  const destinationPages = destinations.map(destination => ({
    url: `${baseUrl}/destinations/${destination}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Property pages from Sanity
  let propertyPages: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: 'weekly';
    priority: number;
  }> = []
  
  try {
    const properties = await getAllProperties()
    propertyPages = properties.map(property => ({
      url: `${baseUrl}/properties/${property.slug}`,
      lastModified: property.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error)
  }

  return [...staticPages, ...destinationPages, ...propertyPages]
}
