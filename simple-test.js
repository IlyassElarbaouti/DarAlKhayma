// Simple test script to check property image structure
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function test() {
  try {
    console.log('Fetching featured properties...');
    
    const properties = await client.fetch(`*[_type == "property" && featured == true] {
      _id,
      title,
      images
    }`);
    
    console.log(`Found ${properties.length} properties`);
    
    if (properties.length > 0) {
      const prop = properties[0];
      console.log('\nFirst property:', prop.title);
      console.log('Images structure:', JSON.stringify(prop.images, null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test().then(() => {
  console.log('Test completed');
  process.exit(0);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
