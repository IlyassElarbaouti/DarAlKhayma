# Dar Al Khayma - Property Rental Platform Documentation

## Project Overview

**Dar Al Khayma** is a premium property rental platform focusing on Moroccan properties, combining the luxury positioning of Onefinestay with the clean, modern design approach of Vanrays. The platform serves as a showcase for high-end rental properties with external booking integration.

### Key Insights from Reference Sites

**Vanrays Analysis:**
- Clean, minimalist design with strong visual hierarchy
- Property-focused layout with high-quality imagery
- Simple navigation and intuitive user flow
- Mobile-first responsive design

**Onefinestay Analysis:**
- Luxury positioning with premium photography
- Curated property selection approach
- Emphasis on unique, high-end accommodations
- Professional service messaging

## Technical Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Shadcn/ui components
- **Animations:** Framer Motion + Aceternity UI
- **CMS:** Sanity.io for content management
- **External Integrations:** Booking.com, Airbnb API links

## Core Features

### 1. Property Showcase
- **Hero Section:** Immersive property galleries with Framer Motion animations
- **Property Grid:** Responsive masonry layout with hover effects
- **Property Details:** Comprehensive property pages with virtual tours
- **Location Integration:** Interactive maps showing property locations in Morocco

### 2. User Experience
- **Search & Filter:** Advanced filtering by location, price, amenities, property type
- **Responsive Design:** Optimized for desktop, tablet, and mobile
- **Performance:** Optimized images, lazy loading, and fast page transitions
- **Accessibility:** WCAG compliant with proper semantic markup

### 3. Content Management (Sanity.io)
- **Property Management:** Easy property CRUD operations
- **Media Library:** Optimized image handling and CDN integration
- **SEO Management:** Dynamic meta tags and structured data
- **Multi-language Support:** Arabic, French, and English content

## Site Architecture

### Page Structure
```
├── Home Page
│   ├── Hero Section (Featured Properties)
│   ├── Property Categories
│   ├── Popular Destinations
│   └── About Section
├── Properties
│   ├── Property Listing Grid
│   ├── Search & Filters
│   └── Individual Property Pages
├── Destinations
│   ├── Morocco Regions
│   ├── City Guides
│   └── Local Experiences
├── About
└── Contact
```

### Component Architecture
```
├── components/
│   ├── ui/ (Shadcn components)
│   ├── layout/
│   │   ├── Header
│   │   ├── Footer
│   │   └── Navigation
│   ├── video/
│   │   ├── HeroVideo
│   │   └── VideoPlayer
│   ├── map/
│   │   ├── PropertyMap
│   │   ├── MapMarker
│   │   └── PropertyCluster
│   ├── property/
│   │   ├── PropertyCard
│   │   ├── PropertyGallery
│   │   ├── PropertyDetails
│   │   └── BookingWidget
│   ├── search/
│   │   ├── SearchBar
│   │   ├── FilterPanel
│   │   └── ResultsGrid
│   └── common/
│       ├── Hero
│       ├── AnimatedSection
│       └── LoadingSpinner
```

## Design System

### Color Palette
- **Primary:** Teal (#2D5A5A) - from logo
- **Secondary:** Sage Green (#8FBC8F) - from logo
- **Accent:** Warm Sand (#F5E6D3)
- **Neutral:** Cool Gray (#F8F9FA to #212529)

### Typography
- **Primary:** Inter or Poppins (modern, clean)
- **Secondary:** Playfair Display (elegant headers)
- **Arabic:** Noto Sans Arabic

### Visual Identity
- Moroccan-inspired geometric patterns (subtle)
- High-quality photography emphasis
- Warm, inviting color scheme
- Clean, minimalist layout

## Key Pages Specification

### 1. Homepage
**Hero Section:**
- Full-screen video background showcasing Morocco's landscapes/properties
- Video overlay with search bar and location autocomplete
- Animated text: "Discover Morocco's Finest Properties"
- Muted autoplay video with fallback image
- Play/pause controls for user preference

**Featured Properties:**
- Grid of 6-8 premium properties
- Hover animations revealing property details
- "View All Properties" CTA

**Destinations Section:**
- Interactive map of Morocco
- Popular cities with property counts
- Beautiful landscape imagery

### 2. Property Listing Page
**Map Integration (Airbnb-style):**
- Split-screen layout: property grid on left, interactive map on right
- Map markers showing property locations with price overlays
- Hover on property card highlights corresponding map marker
- Click marker opens property preview card
- Map clustering for areas with multiple properties
- Zoom controls and region boundary highlighting
- Mobile: Toggle between list view and map view

**Search Interface:**
- Location-based search with Morocco map integration
- Filters: Price range, property type, amenities, guest capacity
- Sort options: Price, popularity, newest

**Property Grid:**
- Masonry layout with lazy loading
- Property cards with image carousels
- Quick view modal functionality

### 3. Individual Property Page
**Image Gallery:**
- Full-screen image viewer with thumbnails
- 360° virtual tour integration (when available)
- Professional photography showcase

**Property Information:**
- Detailed descriptions in multiple languages
- Amenities list with icons
- Location details and nearby attractions
- Guest reviews and ratings

**Booking Integration:**
- External booking widgets for Airbnb, Booking.com
- "Reserve Now" buttons linking to external platforms
- Availability calendar (read-only)

## External Booking Integration

### Supported Platforms
1. **Airbnb Integration**
   - Direct property links
   - Availability sync (display only)
   - Reviews aggregation

2. **Booking.com Partnership**
   - Property listing synchronization
   - Pricing display
   - Direct booking redirects

3. **Additional Platforms**
   - Vrbo/HomeAway links
   - Custom booking forms for direct contact

### Implementation Strategy
- Widget-based integration for seamless UX
- Fallback contact forms for properties without external listings
- Clear pricing transparency and booking terms

## Sanity.io Content Structure

### Schema Definitions

**Property Schema:**
```javascript
{
  name: 'property',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'description', type: 'text' },
    { name: 'images', type: 'array' },
    { name: 'location', type: 'geopoint' },
    { name: 'price', type: 'number' },
    { name: 'bedrooms', type: 'number' },
    { name: 'bathrooms', type: 'number' },
    { name: 'amenities', type: 'array' },
    { name: 'bookingLinks', type: 'object' }
  ]
}
```

**Location Schema:**
```javascript
{
  name: 'location',
  fields: [
    { name: 'city', type: 'string' },
    { name: 'region', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'featuredImage', type: 'image' }
  ]
}
```

## Development Phases

### Phase 1: Foundation (Weeks 1-2)
- Next.js project setup with TypeScript
- Sanity.io CMS configuration
- Basic component library (Shadcn/ui)
- Responsive layout structure

### Phase 2: Core Features (Weeks 3-4)
- Property listing and detail pages
- Search and filtering functionality
- Image galleries and media handling
- Basic animations with Framer Motion

### Phase 3: Advanced Features (Weeks 5-6)
- External booking integration
- Advanced animations (Aceternity UI)
- Performance optimization
- SEO implementation

### Phase 4: Content & Testing (Weeks 7-8)
- Content population via Sanity
- Cross-browser testing
- Mobile optimization
- Performance auditing

## Performance Requirements

### Core Web Vitals Targets
- **LCP:** < 2.5 seconds
- **FID:** < 100 milliseconds
- **CLS:** < 0.1

### Optimization Strategies
- Next.js Image component with optimization
- Lazy loading for property images
- Code splitting and dynamic imports
- CDN integration for static assets

## SEO Strategy

### Technical SEO
- Structured data for properties (Schema.org)
- Dynamic meta tags per property
- XML sitemaps generation
- Multi-language hreflang tags

### Content SEO
- Location-based landing pages
- Property type category pages
- Blog section for Morocco travel content
- Local business listings optimization

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements
- Alt text for all images

## Security Considerations

### Data Protection
- GDPR compliance for EU visitors
- Secure API endpoints
- Rate limiting for search functionality
- Input sanitization and validation

## Analytics & Tracking

### Key Metrics
- Property view rates
- Search behavior analysis
- Booking conversion tracking
- User journey mapping
- Page performance metrics

### Implementation
- Google Analytics 4
- Hotjar for user behavior
- Search Console for SEO monitoring
- Custom event tracking for bookings

## Future Enhancements

### Phase 2 Features
- User accounts and saved properties
- Property comparison tool
- Guest review system
- Mobile app development

### Advanced Features
- AI-powered property recommendations
- Virtual reality property tours
- Dynamic pricing suggestions
- Multilingual chatbot support

## Deployment Strategy

### Hosting Environment
- **Platform:** Vercel (optimal for Next.js)
- **CDN:** Cloudflare for global performance
- **Database:** Sanity.io hosted CMS
- **Domain:** Custom domain with SSL

### CI/CD Pipeline
- GitHub Actions for automated deployment
- Staging environment for testing
- Automated performance testing
- SEO auditing in pipeline

---

## Getting Started

1. **Repository Setup**
   ```bash
   npx create-next-app@latest dar-al-khayma --typescript --tailwind --eslint
   cd dar-al-khayma
   npm install @sanity/client framer-motion lucide-react
   ```

2. **Sanity Configuration**
   ```bash
   npm install @sanity/vision sanity
   npx sanity init
   ```

3. **Component Library**
   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button card input
   ```

This documentation provides the foundation for building a premium property rental platform that captures the essence of Moroccan hospitality while delivering a modern, user-friendly experience.