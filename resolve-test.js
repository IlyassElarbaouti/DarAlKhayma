// Test script to resolve image references properly
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function test() {
  try {
    console.log('Fetching properties with resolved images...');
    
    // Try to resolve the image assets properly
    const properties = await client.fetch(`*[_type == "property" && featured == true] {
      _id,
      title,
      images[] {
        _key,
        alt,
        caption,
        "url": asset.asset->url
      }
    }`);
    
    console.log(`Found ${properties.length} properties`);
    
    properties.forEach((prop, i) => {
      console.log(`\nProperty ${i + 1}: ${prop.title}`);
      if (prop.images && prop.images.length > 0) {
        prop.images.forEach((img, imgIndex) => {
          console.log(`  Image ${imgIndex + 1}:`, {
            key: img._key,
            alt: img.alt,
            url: img.url
          });
        });
      } else {
        console.log('  No images found');
      }
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test().then(() => {
  console.log('\nTest completed');
  process.exit(0);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
