// Test script to check Sanity image assets
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uekmuuz9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function testAssets() {
  try {
    console.log('Testing Sanity image assets...');
    
    // Check if there are any image assets in the project
    const assets = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc) {
      _id,
      url,
      originalFilename,
      size,
      metadata {
        dimensions
      }
    }`);
    
    console.log(`Found ${assets.length} image assets in the project`);
    
    if (assets.length > 0) {
      console.log('\nFirst few assets:');
      assets.slice(0, 5).forEach((asset, i) => {
        console.log(`Asset ${i + 1}:`, {
          id: asset._id,
          filename: asset.originalFilename,
          url: asset.url,
          size: asset.size,
          dimensions: asset.metadata?.dimensions
        });
      });
    } else {
      console.log('No image assets found in the project.');
      console.log('This means images need to be uploaded to Sanity Studio first.');
    }
    
  } catch (error) {
    console.error('Error fetching assets:', error);
  }
}

testAssets();
