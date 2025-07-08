// Test script to check property image fetching
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: false,
});

async function testPropertyImages() {
  try {
    console.log('🔍 Testing property image fetching...\n');
    
    // Test basic connection
    const projectInfo = await client.fetch(`*[_type == "property"] | order(_updatedAt desc) [0...3] {
      _id,
      title,
      slug,
      _updatedAt,
      "imageCount": count(images),
      images[] {
        _key,
        alt,
        caption,
        "url": asset->url,
        "assetId": asset._ref
      }
    }`);
    
    console.log('✅ Successfully connected to Sanity');
    console.log(`📊 Found ${projectInfo.length} recent properties\n`);
    
    projectInfo.forEach((property, index) => {
      console.log(`🏠 Property ${index + 1}:`);
      console.log(`   Title: ${property.title}`);
      console.log(`   Slug: ${property.slug?.current || 'No slug'}`);
      console.log(`   Last Updated: ${new Date(property._updatedAt).toLocaleString()}`);
      console.log(`   Image Count: ${property.imageCount}`);
      
      if (property.images && property.images.length > 0) {
        console.log(`   Sample Images:`);
        property.images.slice(0, 2).forEach((img, imgIndex) => {
          console.log(`     ${imgIndex + 1}. ${img.url || 'No URL'} (${img.alt || 'No alt text'})`);
        });
      } else {
        console.log(`   ⚠️  No images found`);
      }
      console.log('');
    });
    
    // Test specific property by slug if available
    if (projectInfo.length > 0 && projectInfo[0].slug) {
      const slug = projectInfo[0].slug.current;
      console.log(`🔍 Testing specific property fetch for slug: ${slug}`);
      
      const specificProperty = await client.fetch(`*[_type == "property" && slug.current == $slug][0] {
        _id,
        title,
        "imageCount": count(images),
        images[] {
          _key,
          alt,
          caption,
          "url": asset->url
        }
      }`, { slug });
      
      if (specificProperty) {
        console.log(`✅ Successfully fetched property by slug`);
        console.log(`   Images found: ${specificProperty.imageCount}`);
      } else {
        console.log(`❌ Could not fetch property by slug`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing property images:', error);
  }
}

// Run the test
testPropertyImages();
