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

## Section Specifications

### Homepage Sections

#### 1. Hero Section
**Purpose:** Create immediate visual impact and capture user intent
- Full-screen video background (Morocco landscapes/luxury properties)
- Video specifications: 1920x1080, MP4/WebM, <10MB, 15-30 seconds loop
- Overlay content: Main headline, search bar, CTA button
- Fallback: High-quality hero image for slow connections
- Auto-mute with user controls, pause on mobile to save data

#### 2. Search Bar Overlay
**Purpose:** Primary conversion point for property discovery  
- Prominent location autocomplete (Morocco cities/regions)
- Date range picker (check-in/check-out)  
- Guest counter selector
- Property type filter (Villa, Riad, Apartment, etc.)
- "Search Properties" CTA button with subtle animation

#### 3. Featured Properties Grid
**Purpose:** Showcase premium curated selection
- 6-8 hero properties in responsive grid
- High-quality images with overlay pricing
- Quick property details: location, bedrooms, price/night
- Hover effects revealing amenities preview
- "View All Properties" link to main listings

#### 4. Destinations Explorer
**Purpose:** Guide users to popular Morocco regions
- Interactive Morocco map with clickable regions
- Featured destinations: Marrakech, Casablanca, Fez, Rabat, Essaouira
- Each destination shows: property count, price range, hero image
- Regional highlights: Atlas Mountains, Sahara Desert, Atlantic Coast
- "Explore Region" links to filtered property results

#### 5. Why Choose Dar Al Khayma
**Purpose:** Build trust and differentiate from competitors
- **Curated Selection:** "Hand-picked luxury properties across Morocco"
- **Local Expertise:** "Native insights and authentic experiences"  
- **Professional Standards:** "High-quality photography and detailed descriptions"
- **Trusted Partners:** "Seamless booking through Airbnb, Booking.com"
- Icons with brief descriptions for each value proposition

#### 6. Guest Testimonials
**Purpose:** Social proof and authentic experiences
- Rotating carousel of 3-4 testimonials
- Guest photos, names, home countries
- Star ratings and quote highlights
- Focus on unique Morocco experiences
- "Morocco exceeded all expectations" type messaging

#### 7. Newsletter Subscription
**Purpose:** Lead capture and ongoing engagement
- Moroccan-themed background image
- "Discover Morocco's Hidden Gems" headline
- Email input with subscription incentive
- Promise: "New properties, travel tips, seasonal guides"
- Privacy assurance and unsubscribe clarity

### Property Listing Page Sections

#### 1. Search Results Header
**Purpose:** Clear results communication and filtering access
- "X properties in [Location]" results count
- Active filters display with remove options
- Sort dropdown: Price, Rating, Newest, Distance
- View toggle: Grid view / Map view (mobile)

#### 2. Filter Sidebar
**Purpose:** Refined property discovery
- **Location:** Morocco regions/cities with property counts
- **Price Range:** Slider with MAD/EUR/USD toggle
- **Property Type:** Villa, Riad, Apartment, House, etc.
- **Amenities:** Pool, WiFi, Kitchen, Parking, AC, etc.
- **Guests:** Bedroom/bathroom count selectors
- **Special Features:** Beachfront, Mountain View, City Center

#### 3. Property Grid/List
**Purpose:** Efficient property browsing
- Card layout with image carousel (3-5 images)
- Property highlights: rating, price, location
- Quick amenities icons
- "Save" heart icon for favorites
- External booking platform badges

#### 4. Interactive Map (Airbnb-style)
**Purpose:** Geographic property discovery
- Mapbox integration with Morocco focus
- Price overlay markers with hover effects
- Property clustering in dense areas
- Sync with property grid: hover highlights
- Zoom controls and region boundaries
- Property preview cards on marker click

### Individual Property Page Sections

#### 1. Property Gallery
**Purpose:** Immersive visual experience
- Hero image with thumbnail navigation
- Full-screen gallery modal
- 360° virtual tours when available
- Image categories: Exterior, Interior, Amenities, Views
- Professional photography emphasis

#### 2. Property Overview
**Purpose:** Essential information at-a-glance
- Property title and location
- Guest capacity and bedroom/bathroom count
- Key amenities highlight
- Host information and response rate
- Availability calendar (read-only)

#### 3. Detailed Description
**Purpose:** Comprehensive property information
- Multi-language support (Arabic, French, English)
- Local area highlights and nearby attractions
- Transportation and accessibility info
- House rules and policies
- Detailed amenities list with icons

#### 4. Location & Neighborhood
**Purpose:** Area context and local insights
- Embedded map with property location
- Nearby attractions and distances
- Local restaurants and shopping
- Transportation options
- Safety and area information

#### 5. External Booking Integration
**Purpose:** Seamless reservation process
- Platform selection tabs (Airbnb, Booking.com, etc.)
- Pricing comparison when available
- Direct booking widgets embedded
- "Reserve Now" CTAs with platform branding
- Backup contact form for inquiries

#### 6. Reviews & Ratings
**Purpose:** Social proof and trust building
- Aggregate rating from all platforms
- Recent reviews with guest photos
- Review categories: Cleanliness, Location, Value
- Host response highlights
- Review authenticity badges

#### 7. Similar Properties
**Purpose:** Keep users engaged, suggest alternatives
- Algorithm-based recommendations
- Similar price range and amenities
- Same location or nearby areas
- Carousel format with quick view options
- "View Similar Properties" link

### Additional Page Sections

#### About Page
- **Our Story:** Dar Al Khayma mission and vision
- **Morocco Expertise:** Local knowledge and partnerships  
- **Quality Standards:** Property vetting process
- **Team:** Local experts and customer service

#### Contact Page
- **Get in Touch:** Multi-channel contact options
- **Property Partnerships:** Information for property owners
- **Press Inquiries:** Media contact information
- **Location:** Morocco office locations if applicable

These sections create a comprehensive user journey from discovery to booking while maintaining focus on Morocco's unique appeal and luxury positioning.

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

**Why Choose Dar Al Khayma Section:**
- Curated selection of premium properties
- Local expertise and authentic experiences
- Professional photography and detailed descriptions
- Trusted external booking partners

**Testimonials Section:**
- Guest reviews and experiences
- Carousel of testimonial cards
- Star ratings and authentic photos

**Newsletter Signup:**
- Stay updated with new properties
- Moroccan travel tips and guides
- Seasonal offers and recommendations

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