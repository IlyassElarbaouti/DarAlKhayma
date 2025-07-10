// Test API endpoints for review types
// Run with: node test-api-endpoints.js
// Make sure your dev server is running on port 3001

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001';

async function testApiEndpoints() {
  console.log('🔍 Testing Review API Endpoints...\n');

  const endpoints = [
    { name: 'All Reviews', url: '/api/reviews' },
    { name: 'Featured Reviews', url: '/api/reviews?featured=true' },
    { name: 'Guest Reviews', url: '/api/reviews?type=guest' },
    { name: 'Corporate Reviews', url: '/api/reviews?type=corporate' },
    { name: 'Property Owner Reviews', url: '/api/reviews?type=property-owner' },
    { name: 'Limited Results', url: '/api/reviews?limit=3' },
    { name: 'Corporate + Featured', url: '/api/reviews?type=corporate&featured=true' }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint.name}`);
      console.log(`URL: ${BASE_URL}${endpoint.url}`);
      
      const response = await fetch(`${BASE_URL}${endpoint.url}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Status: ${response.status}`);
        console.log(`   Results: ${data.data?.length || 0} reviews`);
        console.log(`   Success: ${data.success}`);
        
        if (data.data && data.data.length > 0) {
          console.log(`   Sample: ${data.data[0].name} (${data.data[0].reviewType || 'no type'})`);
        }
      } else {
        console.log(`❌ Status: ${response.status}`);
        console.log(`   Error: ${data.error || 'Unknown error'}`);
      }
      
      console.log(''); // Empty line for spacing
      
    } catch (error) {
      console.log(`❌ Network Error: ${error.message}`);
      console.log('   Make sure your development server is running on http://localhost:3001');
      console.log('');
    }
  }
  
  console.log('🎯 How to test the pages:');
  console.log('   1. Homepage testimonials: http://localhost:3001');
  console.log('   2. Corporate testimonials: http://localhost:3001/corporate');
  console.log('   3. Property owner testimonials: http://localhost:3001/join-us');
  console.log('   4. Sanity Studio: http://localhost:3001/studio');
  
  console.log('\n📝 Create sample reviews in Sanity Studio:');
  console.log('   • Set "Review Type" to "Corporate Review" for business testimonials');
  console.log('   • Set "Review Type" to "Property Owner Review" for owner testimonials');
  console.log('   • Set "Review Type" to "Guest Review" for regular customer reviews');
  console.log('   • Check "Featured Review" to show on homepage');
}

testApiEndpoints();
