// Test script to check Sanity image data
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function testImages() {
  try {
    console.log('Testing Sanity image data...');
    
    // Fetch featured properties with images
    const query = `*[_type == "property" && featured == true] {
      _id,
      title,
      images[] {
        _key,
        asset-> {
          _id,
          url
        },
        alt,
        caption
      }
    }`;
    
    const properties = await client.fetch(query);
    
    console.log(`Found ${properties.length} featured properties`);
    
    properties.forEach((prop, i) => {
      console.log(`\nProperty ${i + 1}: ${prop.title}`);
      console.log(`Images count: ${prop.images?.length || 0}`);
      
      if (prop.images && prop.images.length > 0) {
        prop.images.forEach((img, imgIndex) => {
          console.log(`  Image ${imgIndex + 1}:`, {
            key: img._key,
            url: img.asset?.url || 'NO URL',
            alt: img.alt || 'NO ALT',
            assetId: img.asset?._id || 'NO ASSET ID'
          });
        });
      } else {
        console.log('  No images found');
      }
    });
    
  } catch (error) {
    console.error('Error fetching image data:', error);
  }
}

testImages();
