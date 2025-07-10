// Simple script to test review types - run with: node test-review-types.js
const { createClient } = require('@sanity/client');

// Create a client for reading data
const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  apiVersion: '2025-05-24',
  useCdn: false,
});

async function testReviewTypes() {
  console.log('🔍 Testing Review Types Implementation...\n');

  try {
    // Test 1: Check if reviews exist
    console.log('1. Checking existing reviews...');
    const allReviews = await client.fetch(`*[_type == "review"]{
      _id,
      name,
      reviewType,
      source,
      companyName,
      jobTitle,
      propertyOwned,
      ownershipDuration
    }`);
    
    console.log(`   Found ${allReviews.length} reviews total`);
    
    if (allReviews.length > 0) {
      const reviewTypes = allReviews.reduce((acc, review) => {
        const type = review.reviewType || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      
      console.log('   Review types breakdown:');
      Object.entries(reviewTypes).forEach(([type, count]) => {
        console.log(`     • ${type}: ${count}`);
      });
    }

    // Test 2: Test guest reviews
    console.log('\n2. Testing guest reviews...');
    const guestReviews = await client.fetch(`*[_type == "review" && reviewType == "guest"][0...3]{
      name,
      location,
      rating,
      text,
      property,
      source
    }`);
    
    console.log(`   Found ${guestReviews.length} guest reviews`);
    guestReviews.forEach((review, i) => {
      console.log(`     ${i + 1}. ${review.name} (${review.rating}⭐) - ${review.source}`);
    });

    // Test 3: Test corporate reviews
    console.log('\n3. Testing corporate reviews...');
    const corporateReviews = await client.fetch(`*[_type == "review" && reviewType == "corporate"][0...3]{
      name,
      location,
      rating,
      companyName,
      jobTitle,
      text
    }`);
    
    console.log(`   Found ${corporateReviews.length} corporate reviews`);
    corporateReviews.forEach((review, i) => {
      console.log(`     ${i + 1}. ${review.name} (${review.companyName}) - ${review.jobTitle}`);
    });

    // Test 4: Test property owner reviews
    console.log('\n4. Testing property owner reviews...');
    const ownerReviews = await client.fetch(`*[_type == "review" && reviewType == "property-owner"][0...3]{
      name,
      location,
      rating,
      propertyOwned,
      ownershipDuration,
      text
    }`);
    
    console.log(`   Found ${ownerReviews.length} property owner reviews`);
    ownerReviews.forEach((review, i) => {
      console.log(`     ${i + 1}. ${review.name} (${review.propertyOwned}) - ${review.ownershipDuration}`);
    });

    // Test 5: Test featured reviews
    console.log('\n5. Testing featured reviews...');
    const featuredReviews = await client.fetch(`*[_type == "review" && featured == true]{
      name,
      reviewType,
      rating,
      featured
    }`);
    
    console.log(`   Found ${featuredReviews.length} featured reviews`);
    featuredReviews.forEach((review, i) => {
      console.log(`     ${i + 1}. ${review.name} (${review.reviewType}) - ${review.rating}⭐`);
    });

    console.log('\n✅ Review types test completed successfully!');
    
    // Show summary
    console.log('\n📊 Summary:');
    console.log(`   Total reviews: ${allReviews.length}`);
    console.log(`   Guest reviews: ${guestReviews.length}`);
    console.log(`   Corporate reviews: ${corporateReviews.length}`);
    console.log(`   Property owner reviews: ${ownerReviews.length}`);
    console.log(`   Featured reviews: ${featuredReviews.length}`);
    
    // Show recommendations
    console.log('\n💡 Recommendations:');
    if (corporateReviews.length === 0) {
      console.log('   • Add corporate reviews in Sanity Studio for the corporate page');
    }
    if (ownerReviews.length === 0) {
      console.log('   • Add property owner reviews in Sanity Studio for the join-us page');
    }
    if (featuredReviews.length === 0) {
      console.log('   • Mark some reviews as "featured" for homepage display');
    }
    
    console.log('\n🎯 Next steps:');
    console.log('   1. Visit http://localhost:3001/studio to manage reviews');
    console.log('   2. Create reviews with different types (guest, corporate, property-owner)');
    console.log('   3. Test the corporate page at http://localhost:3001/corporate');
    console.log('   4. Test the join-us page at http://localhost:3001/join-us');

  } catch (error) {
    console.error('❌ Error testing review types:', error);
  }
}

// Hardcoded sample data to add manually
console.log('\n📝 Sample review data you can add manually in Sanity Studio:');
console.log('\n🏢 Corporate Review Example:');
console.log('   Name: Sarah Johnson');
console.log('   Location: Casablanca, Morocco');
console.log('   Review Type: Corporate');
console.log('   Company Name: TechGlobal Inc.');
console.log('   Job Title: HR Director');
console.log('   Rating: 5');
console.log('   Text: "Dar Al Khayma provided exceptional accommodations for our 6-month project. The team was professional and the properties exceeded our expectations."');
console.log('   Property: Executive Apartments');
console.log('   Source: Corporate Client');
console.log('   Featured: Yes');

console.log('\n🏠 Property Owner Review Example:');
console.log('   Name: Fatima Al-Zahra');
console.log('   Location: Marrakech, Morocco');
console.log('   Review Type: Property Owner');
console.log('   Property Owned: Traditional Riad in Medina');
console.log('   Partnership Duration: 2 years partnership');
console.log('   Rating: 5');
console.log('   Text: "Joining Dar Al Khayma was the best decision for my riad. The professional service and premium guests have exceeded my expectations."');
console.log('   Property: Traditional Riad');
console.log('   Source: Property Owner');
console.log('   Featured: Yes');

testReviewTypes();
