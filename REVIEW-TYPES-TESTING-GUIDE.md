# Review Types Testing Guide

## ✅ What's Been Implemented

### 1. Schema Updates
- Added `reviewType` field with 3 options: guest, corporate, property-owner
- Added corporate-specific fields: `companyName`, `jobTitle`
- Added property owner-specific fields: `propertyOwned`, `ownershipDuration`
- Updated source options to include "Corporate Client" and "Property Owner"

### 2. Components Created
- `CorporateTestimonials` - for corporate page
- `PropertyOwnerTestimonials` - for join-us page
- Updated existing `TestimonialsSection` to work with new types

### 3. API Enhancements
- `/api/reviews?type=corporate` - get corporate reviews
- `/api/reviews?type=property-owner` - get property owner reviews
- `/api/reviews?type=guest` - get guest reviews
- Combined filters work: `/api/reviews?type=corporate&featured=true`

## 🧪 Testing Steps

### Step 1: Check Current State
```bash
node test-review-types.js
```
This will show you what reviews exist and their types.

### Step 2: Test API Endpoints (Optional)
```bash
node test-api-endpoints.js
```
Make sure your dev server is running first: `npm run dev`

### Step 3: Update Existing Reviews in Sanity Studio
1. Go to `http://localhost:3001/studio`
2. Navigate to "Reviews & Testimonials"
3. Edit each existing review:
   - Set "Review Type" to "Guest Review" (for existing ones)
   - Save the review
4. The reviews will now appear in the guest reviews section

### Step 4: Create Sample Corporate Review
1. In Sanity Studio, click "Create" → "Reviews & Testimonials"
2. Fill in the form:
   - **Name**: Sarah Johnson
   - **Guest Location**: Casablanca, Morocco
   - **Rating**: 5
   - **Review Text**: "Dar Al Khayma provided exceptional accommodations for our 6-month project. The team was professional and the properties exceeded our expectations. The flexibility and attention to detail made managing our team's accommodation seamless."
   - **Property Stayed At**: Executive Apartments
   - **Review Type**: Corporate Review
   - **Company Name**: TechGlobal Inc.
   - **Job Title**: HR Director
   - **Review Source**: Corporate Client
   - **Featured Review**: Yes ✓
   - **Display Order**: 1
3. Upload a professional headshot for the avatar
4. Save the review

### Step 5: Create Sample Property Owner Review
1. In Sanity Studio, click "Create" → "Reviews & Testimonials"
2. Fill in the form:
   - **Name**: Fatima Al-Zahra
   - **Guest Location**: Marrakech, Morocco
   - **Rating**: 5
   - **Review Text**: "Joining Dar Al Khayma was the best decision for my riad. The professional service and premium guests have exceeded my expectations. My revenue increased by 65% in the first year, and the property is always maintained to the highest standards."
   - **Property Stayed At**: Traditional Riad
   - **Review Type**: Property Owner Review
   - **Property Owned**: Traditional Riad in Medina
   - **Partnership Duration**: 2 years partnership
   - **Review Source**: Property Owner
   - **Featured Review**: Yes ✓
   - **Display Order**: 2
3. Upload a professional photo for the avatar
4. Save the review

### Step 6: Test the Pages
1. **Corporate Page**: `http://localhost:3001/corporate`
   - Should show your corporate review in the testimonials section
   - Should display company name and job title
   
2. **Join Us Page**: `http://localhost:3001/join-us`
   - Should show your property owner review in the success stories section
   - Should display property owned and partnership duration
   
3. **Homepage**: `http://localhost:3001`
   - Should show featured reviews from all types
   - Should cycle through the testimonials

### Step 7: Verify API Responses
```bash
# Test if corporate reviews are returned
curl "http://localhost:3001/api/reviews?type=corporate"

# Test if property owner reviews are returned
curl "http://localhost:3001/api/reviews?type=property-owner"

# Test if guest reviews are returned
curl "http://localhost:3001/api/reviews?type=guest"
```

## 🎯 What to Look For

### In Sanity Studio:
- Review Type dropdown appears and works
- Corporate fields (Company Name, Job Title) only show for corporate reviews
- Property Owner fields only show for property owner reviews
- Reviews can be saved with different types

### On Corporate Page:
- Corporate testimonials section shows business reviews
- Company names and job titles are displayed
- Professional styling with Building2 icon

### On Join Us Page:
- Property owner testimonials section shows owner reviews
- Property owned and partnership duration are displayed
- Professional styling with Home icon

### On Homepage:
- All featured reviews (regardless of type) appear in testimonials carousel
- Reviews cycle through properly
- Fallback testimonials show if no Sanity data

## 🔧 Troubleshooting

### If Reviews Don't Appear:
1. Check that reviews are marked as "Featured" in Sanity Studio
2. Verify the Review Type is set correctly
3. Make sure the review is saved and published
4. Check browser console for errors
5. Refresh the page to clear cache

### If API Endpoints Don't Work:
1. Make sure development server is running (`npm run dev`)
2. Check that the review has the correct `reviewType` field
3. Test with the hardcoded script: `node test-review-types.js`

### If Pages Show Fallback Content:
- This is normal behavior when no Sanity data exists
- The components automatically fall back to hardcoded testimonials
- Add reviews in Sanity Studio to see dynamic content

## 📊 Success Criteria

✅ **Complete Success**: 
- Corporate page shows dynamic corporate testimonials from Sanity
- Join us page shows dynamic property owner testimonials from Sanity
- Homepage shows mixed testimonials from all types
- API endpoints return correct data for each type

✅ **Partial Success**:
- Components work with fallback data
- API endpoints are functional
- Schema is properly set up in Sanity Studio

## 🚀 Next Steps After Testing

1. **Content Creation**: Add more reviews of each type in Sanity Studio
2. **Image Optimization**: Upload proper avatar images for all reviews
3. **Content Curation**: Mark the best reviews as featured
4. **Performance Testing**: Test with more reviews to ensure good performance
5. **SEO Optimization**: Add schema markup for testimonials if needed

## 📝 Notes

- The system gracefully falls back to hardcoded testimonials if no Sanity data exists
- All existing functionality is preserved
- The implementation is fully backward compatible
- Review types are extensible - you can add more types in the future
