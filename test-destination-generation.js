// Test script to verify destination page generation
// Run with: node test-destination-generation.js

const { getAllDestinations } = require('./src/lib/sanityService');

async function testDestinationGeneration() {
  console.log('🧪 Testing destination static params generation...\n');
  
  try {
    // Simulate the generateStaticParams function
    const destinations = await getAllDestinations();
    console.log(`✅ Fetched ${destinations.length} destinations from Sanity:`);
    
    destinations.forEach((destination, index) => {
      console.log(`   ${index + 1}. ${destination.name} (slug: ${destination.slug})`);
    });
    
    // Generate the params that would be created
    const staticParams = destinations
      .filter((destination) => destination.slug)
      .map((destination) => ({
        id: destination.slug,
      }));
    
    console.log(`\n✅ Generated ${staticParams.length} static params:`);
    staticParams.forEach((param, index) => {
      console.log(`   ${index + 1}. /destinations/${param.id}`);
    });
    
    console.log('\n🎉 Test completed successfully!');
    console.log('💡 New destinations should now be accessible after revalidation.');
    
  } catch (error) {
    console.error('❌ Error testing destination generation:', error);
    console.log('\n🔄 Falling back to hardcoded destinations:');
    const fallback = [
      { id: 'marrakech' },
      { id: 'casablanca' },
      { id: 'fes' },
      { id: 'rabat' },
    ];
    fallback.forEach((param, index) => {
      console.log(`   ${index + 1}. /destinations/${param.id}`);
    });
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testDestinationGeneration();
}

module.exports = { testDestinationGeneration };
