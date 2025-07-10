# Review Types Implementation

This document describes the new review types feature that allows different kinds of reviews to be managed through Sanity CMS instead of being hardcoded.

## Overview

The review system now supports three types of reviews:
- **Guest Reviews** - Traditional customer reviews from property guests
- **Corporate Reviews** - Reviews from business clients using corporate housing
- **Property Owner Reviews** - Testimonials from property owners who partner with us

## Schema Changes

### New Fields in Review Schema

```typescript
// Core review type field
reviewType: 'guest' | 'corporate' | 'property-owner' // Required

// Corporate-specific fields (shown only for corporate reviews)
companyName?: string      // Name of the company
jobTitle?: string         // Professional title of the reviewer

// Property owner-specific fields (shown only for property owner reviews)
propertyOwned?: string    // Name of the property they own
ownershipDuration?: string // How long they've been working with us
```

### Updated Source Options

The source field now includes:
- Airbnb Guest
- Booking.com Guest  
- Direct Booking
- Google Reviews
- **Corporate Client** (new)
- **Property Owner** (new)

## API Endpoints

### Get Reviews by Type

```bash
# Get all guest reviews
GET /api/reviews?type=guest

# Get all corporate reviews  
GET /api/reviews?type=corporate

# Get all property owner reviews
GET /api/reviews?type=property-owner

# Combined filters
GET /api/reviews?type=corporate&featured=true&limit=5
```

### Existing Endpoints (Still Work)

```bash
# Get all reviews
GET /api/reviews

# Get featured reviews
GET /api/reviews?featured=true

# Get limited results
GET /api/reviews?limit=10
```

## Components

### New Specialized Components

#### CorporateTestimonials
Located: `src/components/common/CorporateTestimonials.tsx`

```tsx
<CorporateTestimonials 
  title="Corporate Partners" 
  subtitle="What our business clients say"
  limit={6}
  className="bg-neutral-50"
/>
```

#### PropertyOwnerTestimonials
Located: `src/components/common/PropertyOwnerTestimonials.tsx`

```tsx
<PropertyOwnerTestimonials 
  title="Success Stories"
  subtitle="Property owners who transformed their business"
  limit={4}
/>
```

### Updated Existing Components

#### TestimonialsSection
- Now includes `reviewType` field in fallback data
- Automatically works with new typed reviews from Sanity

## Page Integration

### Corporate Page (`/corporate`)
- Now uses `CorporateTestimonials` component
- Pulls corporate reviews from Sanity
- Falls back to hardcoded data if no Sanity data available

### Join Us Page (`/join-us`)  
- Now uses `PropertyOwnerTestimonials` component
- Pulls property owner reviews from Sanity
- Falls back to hardcoded data if no Sanity data available

## Migration Scripts

### populate-reviews-team.ts
Updated to include sample data for all three review types:
- 6 guest reviews
- 2 corporate reviews  
- 2 property owner reviews

### migrate-reviews.ts (New)
Utility script to:
- Update existing reviews with `reviewType` field
- Add sample corporate and property owner reviews
- Migrate hardcoded reviews to Sanity

## Usage Examples

### In Sanity Studio

1. **Create Guest Review:**
   - Review Type: Guest
   - Fill standard fields (name, location, rating, text, property, source)
   - Corporate and property owner fields are hidden

2. **Create Corporate Review:**
   - Review Type: Corporate  
   - Fill standard fields + Company Name + Job Title
   - Property owner fields are hidden

3. **Create Property Owner Review:**
   - Review Type: Property Owner
   - Fill standard fields + Property Owned + Ownership Duration
   - Corporate fields are hidden

### In Code

```typescript
// Get corporate reviews
const corporateReviews = await getReviewsByType('corporate');

// Get property owner reviews  
const ownerReviews = await getReviewsByType('property-owner');

// Filter reviews by type
const guestReviews = reviews.filter(r => r.reviewType === 'guest');
```

## Benefits

1. **Content Management**: All reviews managed through Sanity CMS
2. **Type Safety**: Proper TypeScript interfaces for each review type
3. **Flexibility**: Easy to add new review types in the future
4. **Reusability**: Specialized components for different contexts
5. **Consistency**: Unified API for all review types
6. **Maintainability**: No more hardcoded testimonials scattered across pages

## Database Structure

### Before (Hardcoded)
```
Corporate Page: hardcoded testimonials array
Join Us Page: hardcoded testimonials array  
Homepage: mix of Sanity + hardcoded fallbacks
```

### After (Sanity CMS)
```
All reviews in Sanity with:
- reviewType field for categorization
- Type-specific fields for additional context
- Unified API for consistent access
- Specialized components for different use cases
```

## Future Enhancements

1. **Review Categories**: Add subcategories within each type
2. **Review Ratings**: Different rating systems for different types
3. **Review Approval**: Workflow for reviewing and approving testimonials
4. **Review Analytics**: Track which review types perform best
5. **Review Templates**: Pre-filled templates for common review scenarios
