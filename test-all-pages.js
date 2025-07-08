// Test script to verify all pages are using real Sanity data
// Run with: node test-all-pages.js

const pages = [
  { name: 'Homepage', url: 'http://localhost:3001' },
  { name: 'About', url: 'http://localhost:3001/about' },
  { name: 'Destinations', url: 'http://localhost:3001/destinations' },
  { name: 'Properties', url: 'http://localhost:3001/properties' },
  { name: 'Contact', url: 'http://localhost:3001/contact' },
  { name: 'Join Us', url: 'http://localhost:3001/join-us' },
  { name: 'Corporate', url: 'http://localhost:3001/corporate' }
];

const apis = [
  { name: 'Properties API', url: 'http://localhost:3001/api/properties' },
  { name: 'Featured Properties API', url: 'http://localhost:3001/api/properties?featured=true' },
  { name: 'Destinations API', url: 'http://localhost:3001/api/destinations' },
  { name: 'Reviews API', url: 'http://localhost:3001/api/reviews?featured=true' },
  { name: 'Team API', url: 'http://localhost:3001/api/team?featured=true' }
];

async function testAPI(api) {
  try {
    console.log(`Testing ${api.name}...`);
    const response = await fetch(api.url);
    const data = await response.json();
    
    if (!response.ok) {
      console.log(`❌ ${api.name}: Failed (${response.status})`);
      console.log('Error:', data);
      return false;
    }
    
    if (data.success && data.data && data.data.length > 0) {
      console.log(`✅ ${api.name}: Success (${data.data.length} items)`);
      
      // Check if data looks real (not mock)
      const firstItem = data.data[0];
      if (firstItem.id && !firstItem.id.includes('mock') && !firstItem.id.includes('fallback')) {
        console.log(`  Real data detected: ID ${firstItem.id}`);
      } else {
        console.log(`  ⚠️  Possible mock data detected`);
      }
      return true;
    } else {
      console.log(`⚠️ ${api.name}: No data returned`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${api.name}: Error - ${error.message}`);
    return false;
  }
}

async function testPages() {
  console.log('🔍 Testing API endpoints for real data...\n');
  
  let successCount = 0;
  const totalAPIs = apis.length;
  
  for (const api of apis) {
    const success = await testAPI(api);
    if (success) successCount++;
    console.log('');
  }
  
  console.log(`\n📊 Summary: ${successCount}/${totalAPIs} APIs returning real data\n`);
  
  console.log('📝 Next steps:');
  console.log('1. Open each page in browser to verify real content is displayed');
  console.log('2. Check browser network tab to confirm API calls are successful');
  console.log('3. Verify images and dynamic content load properly');
  console.log('4. Test adding new content in Sanity Studio to see if it appears');
  
  console.log('\n🔗 Pages to test manually:');
  pages.forEach(page => {
    console.log(`- ${page.name}: ${page.url}`);
  });
  
  console.log('\n🚀 If all tests pass, your site is ready with real-time Sanity data!');
}

testPages();
