// Test script to verify property images are loading correctly
import { getPropertyBySlug } from './src/lib/sanityService.js';

async function testPropertyImages() {
  try {
    console.log('Testing property image loading...\n');
    
    // Test with a known property slug
    const testSlugs = [
      'riad-yasmine-marrakech',
      'villa-atlas-view-marrakech',
      'dar-fes-heritage'
    ];
    
    for (const slug of testSlugs) {
      console.log(`Testing property: ${slug}`);
      
      try {
        const property = await getPropertyBySlug(slug);
        
        if (!property) {
          console.log(`❌ Property not found: ${slug}\n`);
          continue;
        }
        
        console.log(`✅ Found property: ${property.title}`);
        console.log(`📷 Images count: ${property.images.length}`);
        
        if (property.images.length > 0) {
          property.images.forEach((img, index) => {
            console.log(`   Image ${index + 1}:`);
            console.log(`     URL: ${img.url ? '✅ Has URL' : '❌ No URL'}`);
            console.log(`     Alt: ${img.alt || 'No alt text'}`);
            if (img.url) {
              console.log(`     Full URL: ${img.url.substring(0, 80)}...`);
            }
          });
        } else {
          console.log('❌ No images found for this property');
        }
        
        console.log(`🕒 Last updated: ${property.updatedAt}\n`);
        
      } catch (error) {
        console.error(`❌ Error fetching property ${slug}:`, error.message);
      }
    }
    
    console.log('✅ Image loading test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testPropertyImages().then(() => {
  console.log('Test finished');
  process.exit(0);
}).catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
