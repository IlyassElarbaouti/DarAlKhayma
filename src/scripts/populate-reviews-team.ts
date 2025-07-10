// Script to populate Sanity database with sample reviews and team members
import { createClient } from '@sanity/client';

// Create a client with write permissions for the script
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: false, // Don't use CDN for mutations
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
});

// Sample reviews data
const sampleReviews = [
  {
    name: 'Marie Dubois',
    location: 'Paris, France',
    rating: 5,
    text: 'Absolutely perfect stay! The apartment was exactly as shown in photos, impeccably clean and beautifully designed. The location in Marrakech medina was ideal for exploring. Ilyass and his team were incredibly responsive and helpful throughout our stay.',
    property: 'Luxury Riad in Marrakech Medina',
    source: 'Airbnb Guest',
    reviewType: 'guest',
    featured: true,
    verified: true,
    order: 1
  },
  {
    name: 'James Wilson',
    location: 'London, UK',
    rating: 5,
    text: 'Outstanding experience from start to finish. The property exceeded all expectations - modern amenities in a traditional setting. The 24/7 support was invaluable, and the local recommendations were spot on. Will definitely return!',
    property: 'Traditional Riad with Modern Amenities',
    source: 'Airbnb Guest',
    reviewType: 'guest',
    featured: true,
    verified: true,
    order: 2
  },
  {
    name: 'Sofia Rodriguez',
    location: 'Madrid, Spain',
    rating: 5,
    text: 'This was our first time in Morocco and Dar Al Khayma made it unforgettable. Every detail was thought of - from the welcome amenities to the perfectly equipped kitchen. The team\'s hospitality is unmatched. Highly recommended!',
    property: 'Boutique Apartment in Casablanca',
    source: 'Booking.com Guest',
    reviewType: 'guest',
    featured: true,
    verified: true,
    order: 3
  },
  {
    name: 'Andreas Mueller',
    location: 'Berlin, Germany',
    rating: 5,
    text: 'Professional service and stunning property. The design is simply beautiful - authentic Moroccan style with luxury finishes. Location was perfect for both business and leisure. The team went above and beyond to ensure our comfort.',
    property: 'Executive Suite in Rabat',
    source: 'Direct Booking',
    reviewType: 'guest',
    featured: true,
    verified: true,
    order: 4
  },
  {
    name: 'Emma Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'Incredible experience in Essaouira! The ocean view riad was breathtaking, and the team arranged everything from airport transfer to local tours. True Moroccan hospitality at its finest.',
    property: 'Ocean View Riad in Essaouira',
    source: 'Airbnb Guest',
    reviewType: 'guest',
    featured: false,
    verified: true,
    order: 5
  },
  {
    name: 'Luca Rossi',
    location: 'Rome, Italy',
    rating: 5,
    text: 'Perfect for our business trip to Casablanca. The apartment was modern, well-located, and the team was extremely professional. Exceeded all our expectations for corporate accommodation.',
    property: 'Business Apartment in Casablanca',
    source: 'Direct Booking',
    reviewType: 'guest',
    featured: false,
    verified: true,
    order: 6
  },
  // Corporate reviews
  {
    name: 'Sarah Johnson',
    location: 'Casablanca, Morocco',
    rating: 5,
    text: 'Dar Al Khayma provided exceptional accommodations for our 6-month project in Casablanca. The team was professional and the properties exceeded our expectations. The flexibility and attention to detail made managing our team\'s accommodation seamless.',
    property: 'Executive Apartments',
    source: 'Corporate Client',
    reviewType: 'corporate',
    companyName: 'TechGlobal Inc.',
    jobTitle: 'HR Director',
    featured: true,
    verified: true,
    order: 7
  },
  {
    name: 'Marcus Weber',
    location: 'Marrakech, Morocco',
    rating: 5,
    text: 'The flexibility and quality of service made our extended stay in Marrakech seamless. Highly recommended for any corporate housing needs. The properties were exactly what we needed for our consulting team.',
    property: 'Business Suites',
    source: 'Corporate Client',
    reviewType: 'corporate',
    companyName: 'Consulting Partners',
    jobTitle: 'Managing Partner',
    featured: true,
    verified: true,
    order: 8
  },
  // Property owner reviews
  {
    name: 'Fatima Al-Zahra',
    location: 'Marrakech, Morocco',
    rating: 5,
    text: 'Joining Dar Al Khayma was the best decision for my riad. The professional service and premium guests have exceeded my expectations. My revenue increased by 65% in the first year, and the property is always maintained to the highest standards.',
    property: 'Traditional Riad',
    source: 'Property Owner',
    reviewType: 'property-owner',
    propertyOwned: 'Traditional Riad in Medina',
    ownershipDuration: '2 years partnership',
    featured: true,
    verified: true,
    order: 9
  },
  {
    name: 'Hassan Benali',
    location: 'Casablanca, Morocco',
    rating: 5,
    text: 'The team\'s attention to detail and guest care has been exceptional. My property is always well-maintained and guests leave glowing reviews. Our occupancy rate reached 80% consistently.',
    property: 'Modern Villa',
    source: 'Property Owner',
    reviewType: 'property-owner',
    propertyOwned: 'Modern Villa in Anfa',
    ownershipDuration: '1.5 years partnership',
    featured: true,
    verified: true,
    order: 10
  }
];

// Sample team members data
const sampleTeamMembers = [
  {
    name: 'Ahmed Khalil Azakoun',
    role: 'Founder & CEO',
    bio: 'I was born in Agadir, but my passion for hospitality started early when I began managing guest stays and refining every part of the experience. After launching Dar Al Khayma, I now lead the company across Multiple Cities in Morocco making sure both guests and property owners receive a seamless, high-level service every time.',
    tip: 'I love walking through the old medina of Marrakech at sunset, it\'s full of energy, colors, and little hidden cafés that feel like a world of their own.',
    destination: 'The Moroccan coast, from Agadir to Essaouira. There\'s something about the mix of ocean, culture, and calm that\'s unforgettable.',
    items: ['My phone', 'sunglasses', 'a notebook'],
    itemsDescription: 'I\'m always planning the next move.',
    featured: true,
    isActive: true,
    order: 1
  },
  {
    name: 'Youssef Gouhmid',
    role: 'Creative Director',
    bio: 'I was born and raised in Casablanca, a city that blends energy, design, and culture on every corner. I\'ve always been drawn to visual storytelling, which led me to take on the artistic direction at Dar Al Khayma. From branding to photography, I shape how our properties and our identity come to life.',
    tip: 'The rooftop at La Sqala for a calm lunch away from the city buzz, classic Casablanca atmosphere and great views.',
    destination: 'The Atlas Mountains, there\'s something honest and inspiring about the raw landscapes and quiet villages.',
    items: ['My camera', 'sketchbook', 'a playlist for every mood'],
    itemsDescription: '',
    featured: true,
    isActive: true,
    order: 2
  },
  {
    name: 'Abdelwali',
    role: 'Customer Experience',
    bio: 'I was born in Agadir, a city where hospitality is second nature. Growing up here taught me how much the little things matter. At Dar Al Khayma, I handle customer experience on the ground making sure each guest feels welcome, supported, and at ease throughout their stay.',
    tip: 'Visit the marina in the early morning. It\'s quiet, fresh, and the perfect place to start the day with a coffee and ocean breeze.',
    destination: 'The Draa Valley it\'s a completely different side of Morocco. Peaceful, wild, and full of history.',
    items: ['My charger', 'shirt', 'my favorite watch'],
    itemsDescription: '',
    featured: true,
    isActive: true,
    order: 3
  }
];

// Placeholder images for reviews (using Unsplash) - for future use
const _avatarImages = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b147?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
];

// Team member profile images - for future use
const _teamImages = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
];

async function populateReviewsAndTeam() {
  console.log('🚀 Starting reviews and team population...\n');

  try {
    // Step 1: Create reviews
    console.log('⭐ Creating reviews...');
    
    for (let i = 0; i < sampleReviews.length; i++) {
      const review = sampleReviews[i];
      
      // Skip complex asset creation for now - use external URLs in components
      const simpleReviewData = {
        _type: 'review',
        name: review.name,
        location: review.location,
        rating: review.rating,
        text: review.text,
        property: review.property,
        source: review.source,
        reviewType: review.reviewType,
        companyName: review.companyName,
        jobTitle: review.jobTitle,
        propertyOwned: review.propertyOwned,
        ownershipDuration: review.ownershipDuration,
        featured: review.featured,
        verified: review.verified,
        order: review.order
      };
      
      const _createdReview = await client.create(simpleReviewData);
      console.log(`  ✓ Created review: ${review.name} (${review.rating} stars)`);
    }

    // Step 2: Create team members
    console.log('\n👤 Creating team members...');
    
    for (let i = 0; i < sampleTeamMembers.length; i++) {
      const teamMember = sampleTeamMembers[i];
      
      const simpleTeamMemberData = {
        _type: 'teamMember',
        name: teamMember.name,
        role: teamMember.role,
        bio: teamMember.bio,
        tip: teamMember.tip,
        destination: teamMember.destination,
        items: teamMember.items,
        itemsDescription: teamMember.itemsDescription,
        featured: teamMember.featured,
        isActive: teamMember.isActive,
        order: teamMember.order
      };
      
      const _createdTeamMember = await client.create(simpleTeamMemberData);
      console.log(`  ✓ Created team member: ${teamMember.name} - ${teamMember.role}`);
    }

    console.log('\n🎉 Reviews and team population completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  • ${sampleReviews.length} reviews created`);
    console.log(`  • ${sampleTeamMembers.length} team members created`);
    
    console.log('\n🔗 Next steps:');
    console.log('  • Visit your Sanity Studio to manage reviews and team members');
    console.log('  • Add images to reviews and team members in Sanity Studio');
    console.log('  • Test your frontend to see the dynamic data');

  } catch (error) {
    console.error('❌ Error populating reviews and team:', error);
    throw error;
  }
}

// Export the function for use in other scripts
export { populateReviewsAndTeam };

// Allow direct execution
if (require.main === module) {
  populateReviewsAndTeam()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}
