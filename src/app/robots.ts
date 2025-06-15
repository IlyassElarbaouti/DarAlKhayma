import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/', '/private/', '/studio/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dar-al-khayma.com'}/sitemap.xml`,
  }
}
