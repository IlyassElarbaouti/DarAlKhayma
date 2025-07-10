// Script to migrate existing hardcoded reviews to the new typed schema
import { createClient } from '@sanity/client';

// Create a client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function updateExistingReviews() {
  console.log('🔄 Updating existing reviews with reviewType field...\n');

  try {
    // Get all existing reviews
    const reviews = await client.fetch(`*[_type == "review"]{_id, _rev, reviewType, source, companyName, jobTitle, propertyOwned}`);
    
    console.log(`Found ${reviews.length} existing reviews`);
    
    for (const review of reviews) {
      const updates: any = {};
      let needsUpdate = false;
      
      // If reviewType is missing, determine it from the source
      if (!review.reviewType) {
        if (review.source === 'Corporate Client') {
          updates.reviewType = 'corporate';
          needsUpdate = true;
        } else if (review.source === 'Property Owner') {
          updates.reviewType = 'property-owner';
          needsUpdate = true;
        } else {
          updates.reviewType = 'guest';
          needsUpdate = true;
        }
      }
      
      // If we need to update, patch the document
      if (needsUpdate) {
        await client.patch(review._id).set(updates).commit();
        console.log(`  ✓ Updated review ${review._id} with reviewType: ${updates.reviewType}`);
      }
    }
    
    console.log('\n✅ Migration completed successfully!');
    
    // Summary
    const updatedReviews = await client.fetch(`*[_type == "review"]{reviewType}`);
    const summary = updatedReviews.reduce((acc: any, review: any) => {
      acc[review.reviewType] = (acc[review.reviewType] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Review types summary:');
    Object.entries(summary).forEach(([type, count]) => {
      console.log(`  • ${type}: ${count}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating reviews:', error);
    throw error;
  }
}

// Add sample corporate and property owner reviews if they don't exist
async function addSampleTypedReviews() {
  console.log('📝 Adding sample typed reviews...\n');
  
  const sampleCorporateReviews = [
    {
      _type: 'review',
      name: 'Rachel Morrison',
      location: 'Rabat, Morocco',
      rating: 5,
      text: 'Exceptional service for our quarterly team retreat. The accommodation was perfect for our group of 15 executives. Every detail was handled professionally, from arrival to departure.',
      property: 'Executive Resort Complex',
      source: 'Corporate Client',
      reviewType: 'corporate',
      companyName: 'Global Solutions Ltd',
      jobTitle: 'Chief Operations Officer',
      featured: true,
      verified: true,
      order: 20
    }
  ];
  
  const samplePropertyOwnerReviews = [
    {
      _type: 'review',
      name: 'Khalid Bennani',
      location: 'Fez, Morocco',
      rating: 5,
      text: 'Working with Dar Al Khayma transformed my traditional dar into a premium destination. The marketing and guest management is exceptional. I\'ve seen a 90% increase in occupancy.',
      property: 'Traditional Dar',
      source: 'Property Owner',
      reviewType: 'property-owner',
      propertyOwned: 'Historic Dar in Fez Medina',
      ownershipDuration: '3 years partnership',
      featured: true,
      verified: true,
      order: 21
    }
  ];
  
  try {
    // Add corporate reviews
    for (const review of sampleCorporateReviews) {
      const _created = await client.create(review);
      console.log(`  ✓ Created corporate review: ${review.name} (${review.companyName})`);
    }
    
    // Add property owner reviews
    for (const review of samplePropertyOwnerReviews) {
      const _created = await client.create(review);
      console.log(`  ✓ Created property owner review: ${review.name} (${review.propertyOwned})`);
    }
    
    console.log('\n✅ Sample typed reviews added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding sample reviews:', error);
    throw error;
  }
}

// Main function
async function migrateReviews() {
  try {
    await updateExistingReviews();
    await addSampleTypedReviews();
    
    console.log('\n🎉 Review migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('  • Visit your Sanity Studio to see the new review types');
    console.log('  • Check your corporate and join-us pages for the new testimonials');
    console.log('  • Test the API endpoints: /api/reviews?type=corporate, /api/reviews?type=property-owner');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Export the function for use in other scripts
export { migrateReviews };

// Allow direct execution
if (require.main === module) {
  migrateReviews()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}
