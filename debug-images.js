// Check raw image structure in Sanity
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  apiVersion: '2025-05-24',
  useCdn: false,
});

async function checkImageStructure() {
  try {
    console.log('🔍 Checking raw image structure...\n');
    
    const result = await client.fetch(`*[_type == 'property' && count(images) > 0][0] {
      title,
      images[0] {
        _key,
        alt,
        asset {
          _ref,
          _type
        }
      }
    }`);
    
    console.log('Raw image structure:');
    console.log(JSON.stringify(result, null, 2));
    
    // Test different URL resolution methods
    console.log('\n🔍 Testing different URL resolution methods...\n');
    
    const testQueries = [
      {
        name: 'Method 1: asset.asset->url',
        query: `*[_type == 'property' && count(images) > 0][0] {
          title,
          images[0] {
            "url": asset.asset->url
          }
        }`
      },
      {
        name: 'Method 2: asset->url', 
        query: `*[_type == 'property' && count(images) > 0][0] {
          title,
          images[0] {
            "url": asset->url
          }
        }`
      },
      {
        name: 'Method 3: Direct asset resolution',
        query: `*[_type == 'property' && count(images) > 0][0] {
          title,
          images[0] {
            asset-> {
              url
            }
          }
        }`
      }
    ];
    
    for (const test of testQueries) {
      try {
        const result = await client.fetch(test.query);
        console.log(`${test.name}:`);
        console.log(JSON.stringify(result, null, 2));
        console.log('');
      } catch (error) {
        console.log(`${test.name}: ERROR - ${error.message}`);
        console.log('');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkImageStructure();
