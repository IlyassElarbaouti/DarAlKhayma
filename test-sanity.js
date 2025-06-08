// Quick test to check Sanity connection and featured properties
import { client } from './src/lib/sanity.js';

async function testSanity() {
  try {
    console.log('Testing Sanity connection...');
    
    // Test basic connection
    const allProperties = await client.fetch('*[_type == "property"]');
    console.log(`Total properties in database: ${allProperties.length}`);
    
    // Check featured properties
    const featuredProperties = await client.fetch('*[_type == "property" && featured == true]');
    console.log(`Featured properties: ${featuredProperties.length}`);
    
    if (featuredProperties.length > 0) {
      console.log('Featured properties found:');
      featuredProperties.forEach((prop, i) => {
        console.log(`${i + 1}. ${prop.title} (ID: ${prop._id})`);
      });
    } else {
      console.log('No featured properties found. Let\'s check what properties exist:');
      if (allProperties.length > 0) {
        console.log('Available properties:');
        allProperties.slice(0, 5).forEach((prop, i) => {
          console.log(`${i + 1}. ${prop.title} - Featured: ${prop.featured || false}`);
        });
      }
    }
  } catch (error) {
    console.error('Error connecting to Sanity:', error);
  }
}

testSanity();
