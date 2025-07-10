// Simple migration script to add reviewType to existing reviews
// Run with: node migrate-existing-reviews.js

const { createClient } = require('@sanity/client');

// Create a client for reading data (no write permissions needed for this check)
const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  apiVersion: '2025-05-24',
  useCdn: false,
});

async function migrateExistingReviews() {
  console.log('🔄 Migrating existing reviews to add reviewType field...\n');

  try {
    // Get all reviews without reviewType
    const reviews = await client.fetch(`*[_type == "review" && !defined(reviewType)]{
      _id,
      name,
      source,
      text,
      property
    }`);
    
    console.log(`Found ${reviews.length} reviews that need migration`);
    
    if (reviews.length === 0) {
      console.log('✅ All reviews already have reviewType field!');
      return;
    }
    
    console.log('\n📋 Reviews that need migration:');
    reviews.forEach((review, i) => {
      console.log(`${i + 1}. ${review.name} - Source: ${review.source || 'Unknown'}`);
    });
    
    console.log('\n💡 To update these reviews, you have two options:');
    console.log('\n🎯 Option 1: Update manually in Sanity Studio');
    console.log('   1. Go to http://localhost:3001/studio');
    console.log('   2. Navigate to "Reviews & Testimonials"');
    console.log('   3. Edit each review and set the "Review Type" field to "Guest Review"');
    console.log('   4. Save each review');
    
    console.log('\n🎯 Option 2: Use GROQ queries in Sanity Studio');
    console.log('   1. Go to http://localhost:3001/studio');
    console.log('   2. Open Vision (query tool) from the top menu');
    console.log('   3. Run this query to see reviews without reviewType:');
    console.log('      *[_type == "review" && !defined(reviewType)]');
    
    console.log('\n🔧 Or create a Sanity API token and run automated migration:');
    console.log('   1. Go to https://sanity.io/manage');
    console.log('   2. Select your project');
    console.log('   3. Go to API → Tokens');
    console.log('   4. Create a new token with "Editor" permissions');
    console.log('   5. Add it to your .env.local as SANITY_API_TOKEN=your_token');
    console.log('   6. Run: npm run populate:reviews-team');
    
  } catch (error) {
    console.error('❌ Error checking reviews:', error);
  }
}

migrateExistingReviews();
