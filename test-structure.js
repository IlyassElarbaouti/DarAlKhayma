// Test script to check how images are structured in properties
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function testPropertyStructure() {
  try {
    console.log('Testing property image structure...');
    
    // Get raw property data to see how images are structured
    const properties = await client.fetch(`*[_type == "property" && featured == true] {
      _id,
      title,
      images
    }`);
    
    console.log(`Found ${properties.length} featured properties`);
    
    properties.forEach((prop, i) => {
      console.log(`\nProperty ${i + 1}: ${prop.title}`);
      console.log('Raw images structure:', JSON.stringify(prop.images, null, 2));
    });
    
    // Also check what happens when we try to resolve the asset references
    console.log('\n--- Checking with asset resolution ---');
    const propertiesWithAssets = await client.fetch(`*[_type == "property" && featured == true] {
      _id,
      title,
      images[] {
        _key,
        asset,
        alt,
        caption
      }
    }`);
    
    propertiesWithAssets.forEach((prop, i) => {
      console.log(`\nProperty ${i + 1}: ${prop.title}`);
      if (prop.images && prop.images.length > 0) {
        prop.images.forEach((img, imgIndex) => {
          console.log(`  Image ${imgIndex + 1}:`, {
            key: img._key,
            asset: img.asset,
            alt: img.alt
          });
        });
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testPropertyStructure();
