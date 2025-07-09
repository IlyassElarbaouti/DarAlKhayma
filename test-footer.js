// Test footer dynamic data
const { getFeaturedDestinations } = require('./src/lib/sanityService');

async function testFooterData() {
  try {
    console.log('Testing footer dynamic data...');
    
    const destinations = await getFeaturedDestinations();
    console.log(`✅ Fetched ${destinations.length} featured destinations for footer:`);
    
    destinations.slice(0, 6).forEach((dest, i) => {
      console.log(`${i + 1}. ${dest.name} (${dest.region}) - /destinations/${dest.slug.current}`);
    });
    
    console.log('\n🎉 Footer will now use dynamic destination data!');
    
  } catch (error) {
    console.error('❌ Error testing footer data:', error);
  }
}

testFooterData();
