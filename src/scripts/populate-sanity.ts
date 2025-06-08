// Script to populate Sanity database with comprehensive sample data
import { createClient } from '@sanity/client';

// Create a client with write permissions for the script
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: false, // Don't use CDN for mutations
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
});

// Sample data for locations
const sampleLocations = [
  {
    city: 'Marrakech',
    region: 'Marrakech-Safi',
    country: 'Morocco',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    neighborhood: 'Medina',
    description: 'Historic heart of Marrakech with traditional riads and souks'
  },
  {
    city: 'Fes',
    region: 'Fès-Meknès',
    country: 'Morocco',
    coordinates: { lat: 34.0181, lng: -5.0078 },
    neighborhood: 'Fes el-Bali',
    description: 'Ancient medina with stunning traditional architecture'
  },
  {
    city: 'Essaouira',
    region: 'Marrakech-Safi',
    country: 'Morocco',
    coordinates: { lat: 31.5085, lng: -9.7595 },
    neighborhood: 'Old Town',
    description: 'Coastal city with Portuguese-influenced architecture'
  },
  {
    city: 'Chefchaouen',
    region: 'Tanger-Tétouan-Al Hoceïma',
    country: 'Morocco',
    coordinates: { lat: 35.1681, lng: -5.2636 },
    neighborhood: 'Blue City',
    description: 'Famous blue-painted mountain town'
  },
  {
    city: 'Casablanca',
    region: 'Casablanca-Settat',
    country: 'Morocco',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    neighborhood: 'City Center',
    description: 'Modern economic capital of Morocco'
  }
];

// Sample data for amenities
const sampleAmenities = [
  { name: 'Wi-Fi', icon: '📶', category: 'basics', description: 'High-speed internet connection' },
  { name: 'Swimming Pool', icon: '🏊‍♂️', category: 'features', description: 'Private or shared swimming pool' },
  { name: 'Air Conditioning', icon: '❄️', category: 'basics', description: 'Climate control system' },
  { name: 'Kitchen', icon: '🍳', category: 'basics', description: 'Fully equipped kitchen' },
  { name: 'Parking', icon: '🚗', category: 'features', description: 'Private parking space' },
  { name: 'Garden', icon: '🌿', category: 'features', description: 'Private garden or outdoor space' },
  { name: 'Rooftop Terrace', icon: '🏛️', category: 'features', description: 'Rooftop terrace with views' },
  { name: 'Traditional Hammam', icon: '🛁', category: 'features', description: 'Traditional Moroccan steam bath' },
  { name: 'Fireplace', icon: '🔥', category: 'features', description: 'Traditional fireplace' },
  { name: 'Security System', icon: '🔒', category: 'safety', description: '24/7 security monitoring' },
  { name: 'Concierge Service', icon: '👨‍💼', category: 'features', description: 'Personal concierge assistance' },
  { name: 'Airport Transfer', icon: '✈️', category: 'location', description: 'Complimentary airport pickup' },
  { name: 'Breakfast Included', icon: '🥐', category: 'features', description: 'Traditional Moroccan breakfast' },
  { name: 'Spa Services', icon: '💆‍♀️', category: 'entertainment', description: 'In-house spa treatments' },
  { name: 'TV', icon: '📺', category: 'entertainment', description: 'Flat-screen TV with cable' },
  { name: 'Balcony', icon: '🌅', category: 'features', description: 'Private balcony with views' },
  { name: 'Washing Machine', icon: '👕', category: 'basics', description: 'Laundry facilities' },
  { name: 'Gym Access', icon: '💪', category: 'entertainment', description: 'Fitness center access' },
  { name: 'Pet Friendly', icon: '🐕', category: 'features', description: 'Pets welcome' },
  { name: 'Beach Access', icon: '🏖️', category: 'location', description: 'Direct beach access' }
];

// Sample data for destinations
const sampleDestinations = [
  {
    name: 'Marrakech',
    slug: { current: 'marrakech' },
    description: 'The Red City, known for its vibrant souks, stunning palaces, and rich cultural heritage. Marrakech offers an authentic Moroccan experience with luxury accommodations in traditional riads.',
    shortDescription: 'Vibrant imperial city with traditional riads and bustling souks',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    featured: true,
    highlights: [
      'Jemaa el-Fnaa square',
      'Majorelle Garden',
      'Bahia Palace',
      'Traditional souks',
      'Atlas Mountains nearby'
    ],
    attractions: [
      { name: 'Koutoubia Mosque', type: 'Religious Site', description: 'Iconic 12th-century mosque and minaret' },
      { name: 'Saadian Tombs', type: 'Historical Site', description: 'Royal necropolis from the Saadian dynasty' },
      { name: 'El Badi Palace', type: 'Palace', description: 'Ruins of a 16th-century palace' }
    ],
    activities: ['Shopping in souks', 'Camel trekking', 'Cooking classes', 'Spa treatments', 'Desert excursions'],
    transportation: {
      airport: 'Marrakech Menara Airport (RAK)',
      trainStation: 'Marrakech Railway Station',
      carRental: 'Available at airport and city center'
    },
    weather: {
      bestTimeToVisit: 'October to April',
      averageTemp: '20-25°C',
      rainyMonths: ['November', 'December', 'January']
    }
  },
  {
    name: 'Fes',
    slug: { current: 'fes' },
    description: 'The spiritual and cultural capital of Morocco, home to the world\'s oldest university and the largest car-free urban area. Fes offers an immersive medieval experience.',
    shortDescription: 'Ancient imperial city with the world\'s largest medina',
    region: 'Fès-Meknès',
    coordinates: { lat: 34.0181, lng: -5.0078 },
    featured: true,
    highlights: [
      'Fes el-Bali medina',
      'Al-Qarawiyyin University',
      'Tanneries',
      'Royal Palace',
      'Artisan workshops'
    ],
    attractions: [
      { name: 'Bou Inania Madrasa', type: 'Religious School', description: '14th-century Islamic school with stunning architecture' },
      { name: 'Chouara Tannery', type: 'Workshop', description: 'Traditional leather tanning pits' }
    ],
    activities: ['Medina tours', 'Artisan workshops', 'Traditional cuisine', 'Historical sites'],    transportation: {
      airport: 'Fes-Saïs Airport (FEZ)',
      trainStation: 'Fes Railway Station',
      carRental: 'Available at airport'
    },
    weather: {
      bestTimeToVisit: 'April to June, September to November',
      averageTemp: '18-22°C',
      rainyMonths: ['November', 'December', 'January', 'February']
    }
  },
  {
    name: 'Essaouira',
    slug: { current: 'essaouira' },
    description: 'A charming coastal city with Portuguese influence, known for its windswept beaches, fresh seafood, and vibrant arts scene.',
    shortDescription: 'Coastal gem with Atlantic beaches and Portuguese architecture',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.5085, lng: -9.7595 },
    featured: true,
    highlights: [
      'Essaouira Medina',
      'Skala de la Ville',
      'Atlantic beaches',
      'Argan oil cooperatives',
      'Music festivals'
    ],
    attractions: [
      { name: 'Essaouira Citadel', type: 'Fortress', description: '18th-century sea-facing ramparts' },
      { name: 'Moulay Hassan Square', type: 'Public Square', description: 'Central square with cafes and restaurants' }
    ],
    activities: ['Beach activities', 'Windsurfing', 'Seafood dining', 'Art galleries', 'Music festivals'],    transportation: {
      airport: 'Essaouira-Mogador Airport (ESU)',
      trainStation: 'Not available',
      carRental: 'Available in city center'
    },
    weather: {
      bestTimeToVisit: 'Year-round',
      averageTemp: '16-22°C',
      rainyMonths: ['November', 'December', 'January']
    }
  }
];

// Sample properties data
const sampleProperties = [
  {
    title: 'Luxury Riad Yasmine - Traditional Elegance in Marrakech Medina',
    slug: { current: 'luxury-riad-yasmine-marrakech' },
    description: 'Step into a world of traditional Moroccan luxury at Riad Yasmine, a beautifully restored 18th-century palace in the heart of Marrakech Medina. This stunning property features intricate zellige tilework, carved cedar ceilings, and a tranquil central courtyard with a traditional fountain. Each room is uniquely decorated with authentic Moroccan furnishings and modern amenities.',
    shortDescription: 'Authentic 18th-century riad with traditional architecture and luxury amenities',
    category: 'riad',
    featured: true,
    price: { amount: 1500, currency: 'MAD', period: 'night' },
    specifications: { bedrooms: 4, bathrooms: 3, guests: 8, area: 200 },
    availability: { available: true },
    rating: { average: 4.8, count: 127 },
    bookingLinks: [
      { platform: 'airbnb', url: 'https://airbnb.com/rooms/12345', label: 'Book on Airbnb' },
      { platform: 'booking', url: 'https://booking.com/hotel/ma/riad-yasmine', label: 'Book on Booking.com' }
    ]
  },
  {
    title: 'Villa Atlas View - Modern Luxury with Mountain Panorama',
    slug: { current: 'villa-atlas-view-marrakech' },
    description: 'Experience contemporary Moroccan living at Villa Atlas View, a stunning modern property offering breathtaking views of the Atlas Mountains. This architecturally striking villa combines traditional Moroccan elements with contemporary design, featuring a spectacular infinity pool, landscaped gardens, and spacious terraces perfect for entertaining.',
    shortDescription: 'Modern villa with Atlas Mountain views and infinity pool',
    category: 'villa',
    featured: true,
    price: { amount: 2800, currency: 'MAD', period: 'night' },
    specifications: { bedrooms: 5, bathrooms: 4, guests: 10, area: 350 },
    availability: { available: true },
    rating: { average: 4.9, count: 89 },
    bookingLinks: [
      { platform: 'vrbo', url: 'https://vrbo.com/12345', label: 'Book on VRBO' },
      { platform: 'direct', url: 'https://villaatlasview.com', label: 'Book Direct' }
    ]
  },
  {
    title: 'Dar Fes Heritage - Authentic Medina Experience',
    slug: { current: 'dar-fes-heritage' },
    description: 'Immerse yourself in the medieval charm of Fes at Dar Fes Heritage, a lovingly restored traditional house in the heart of the ancient medina. This authentic dar features original architectural details, hand-painted tiles, and a peaceful rooftop terrace overlooking the historic city.',
    shortDescription: 'Traditional house in Fes medina with rooftop terrace',
    category: 'house',
    featured: false,
    price: { amount: 900, currency: 'MAD', period: 'night' },
    specifications: { bedrooms: 3, bathrooms: 2, guests: 6, area: 150 },
    availability: { available: true },
    rating: { average: 4.6, count: 73 },
    bookingLinks: [
      { platform: 'airbnb', url: 'https://airbnb.com/rooms/67890', label: 'Book on Airbnb' }
    ]
  },
  {
    title: 'Riad Ocean Pearl - Seaside Retreat in Essaouira',
    slug: { current: 'riad-ocean-pearl-essaouira' },
    description: 'Discover coastal tranquility at Riad Ocean Pearl, a charming riad just steps from Essaouira\'s pristine beaches. This beautifully renovated property features ocean views, traditional Moroccan architecture, and a rooftop terrace perfect for watching Atlantic sunsets.',
    shortDescription: 'Coastal riad near Essaouira beaches with ocean views',
    category: 'riad',
    featured: true,
    price: { amount: 1200, currency: 'MAD', period: 'night' },
    specifications: { bedrooms: 4, bathrooms: 3, guests: 8, area: 180 },
    availability: { available: true },
    rating: { average: 4.7, count: 156 },
    bookingLinks: [
      { platform: 'booking', url: 'https://booking.com/hotel/ma/riad-ocean-pearl', label: 'Book on Booking.com' }
    ]
  },
  {
    title: 'Blue House Chefchaouen - Mountain Retreat',
    slug: { current: 'blue-house-chefchaouen' },
    description: 'Experience the magic of the Blue City at Blue House Chefchaouen, a traditional house painted in the iconic blue hues of this mountain town. Enjoy stunning views of the Rif Mountains and explore the charming blue-painted streets right at your doorstep.',
    shortDescription: 'Traditional blue house in the heart of Chefchaouen',
    category: 'house',
    featured: false,
    price: { amount: 750, currency: 'MAD', period: 'night' },
    specifications: { bedrooms: 2, bathrooms: 2, guests: 4, area: 100 },
    availability: { available: true },
    rating: { average: 4.5, count: 92 },
    bookingLinks: [
      { platform: 'airbnb', url: 'https://airbnb.com/rooms/11111', label: 'Book on Airbnb' }
    ]
  },
  {
    title: 'Casablanca Modern Apartment - City Center Living',
    slug: { current: 'casablanca-modern-apartment' },
    description: 'Stay in the heart of Morocco\'s economic capital at this modern apartment in Casablanca. Perfect for business travelers and city explorers, featuring contemporary amenities and easy access to the Hassan II Mosque and business districts.',
    shortDescription: 'Modern city apartment in Casablanca center',
    category: 'apartment',
    featured: false,
    price: { amount: 600, currency: 'MAD', period: 'night' },
    specifications: { bedrooms: 2, bathrooms: 1, guests: 4, area: 90 },
    availability: { available: true },
    rating: { average: 4.3, count: 45 },
    bookingLinks: [
      { platform: 'booking', url: 'https://booking.com/hotel/ma/casa-apartment', label: 'Book on Booking.com' }
    ]
  }
];

async function populateSanityDatabase() {
  console.log('🚀 Starting Sanity database population...\n');

  try {
    // Step 1: Create locations
    console.log('🏢 Creating locations...');
    const createdLocations = [];
    
    for (const location of sampleLocations) {
      const createdLocation = await client.create({
        _type: 'location',
        ...location
      });
      createdLocations.push(createdLocation);
      console.log(`  ✓ Created location: ${location.city}`);
    }

    // Step 2: Create amenities
    console.log('\n🏖️ Creating amenities...');
    const createdAmenities = [];
    
    for (const amenity of sampleAmenities) {
      const createdAmenity = await client.create({
        _type: 'amenity',
        ...amenity
      });
      createdAmenities.push(createdAmenity);
      console.log(`  ✓ Created amenity: ${amenity.name}`);
    }

    // Step 3: Create destinations
    console.log('\n🌍 Creating destinations...');
    const createdDestinations = [];
    
    for (const destination of sampleDestinations) {
      const createdDestination = await client.create({
        _type: 'destination',
        ...destination
      });
      createdDestinations.push(createdDestination);
      console.log(`  ✓ Created destination: ${destination.name}`);
    }

    // Step 4: Create properties
    console.log('\n🏠 Creating properties...');
    
    for (let i = 0; i < sampleProperties.length; i++) {
      const property = sampleProperties[i];
        // Assign location based on property title/description
      let locationRef = createdLocations[0]; // Default to first location
      if (property.title.includes('Marrakech')) {
        locationRef = createdLocations.find(loc => loc.city === 'Marrakech') || locationRef;
      } else if (property.title.includes('Fes')) {
        locationRef = createdLocations.find(loc => loc.city === 'Fes') || locationRef;
      } else if (property.title.includes('Essaouira')) {
        locationRef = createdLocations.find(loc => loc.city === 'Essaouira') || locationRef;
      } else if (property.title.includes('Chefchaouen')) {
        locationRef = createdLocations.find(loc => loc.city === 'Chefchaouen') || locationRef;
      } else if (property.title.includes('Casablanca')) {
        locationRef = createdLocations.find(loc => loc.city === 'Casablanca') || locationRef;
      }

      // Randomly assign 3-6 amenities
      const randomAmenities = [];
      const numAmenities = Math.floor(Math.random() * 4) + 3; // 3-6 amenities
      const shuffledAmenities = [...createdAmenities].sort(() => 0.5 - Math.random());
      
      for (let j = 0; j < numAmenities; j++) {
        randomAmenities.push({
          _type: 'reference',
          _ref: shuffledAmenities[j]._id
        });
      }

      const propertyData = {
        _type: 'property',
        title: property.title,
        slug: property.slug,
        description: property.description,
        shortDescription: property.shortDescription,
        location: {
          _type: 'reference',
          _ref: locationRef._id
        },
        price: property.price,
        specifications: property.specifications,
        amenities: randomAmenities,
        bookingLinks: property.bookingLinks,
                featured: property.featured,
        category: property.category,
        availability: property.availability,
        rating: property.rating
      };
      
      const _createdProperty = await client.create(propertyData);
      console.log(`  ✓ Created property: ${property.title.substring(0, 50)}...`);
    }

    console.log('\n🎉 Database population completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  • ${createdLocations.length} locations created`);
    console.log(`  • ${createdAmenities.length} amenities created`);
    console.log(`  • ${createdDestinations.length} destinations created`);
    console.log(`  • ${sampleProperties.length} properties created`);
    
    console.log('\n🔗 Next steps:');
    console.log('  • Visit your Sanity Studio to see the data');
    console.log('  • Test your frontend to see the properties');
    console.log('  • Add images to properties in Sanity Studio for better presentation');

  } catch (error) {
    console.error('❌ Error populating database:', error);
    throw error;
  }
}

// Helper function to clean database (optional)
export async function cleanDatabase() {
  console.log('🧹 Cleaning existing data...');
  
  try {
    // Delete all properties
    await client.delete({ query: '*[_type == "property"]' });
    console.log('  ✓ Deleted all properties');
    
    // Delete all locations
    await client.delete({ query: '*[_type == "location"]' });
    console.log('  ✓ Deleted all locations');
    
    // Delete all amenities
    await client.delete({ query: '*[_type == "amenity"]' });
    console.log('  ✓ Deleted all amenities');
    
    // Delete all destinations
    await client.delete({ query: '*[_type == "destination"]' });
    console.log('  ✓ Deleted all destinations');
    
    console.log('✅ Database cleaned successfully!');
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    throw error;
  }
}

// Run the population script
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--clean')) {
    console.log('🧹 Cleaning database first...\n');
    cleanDatabase()
      .then(() => populateSanityDatabase())
      .catch(console.error);
  } else {
    populateSanityDatabase().catch(console.error);
  }
}

export { populateSanityDatabase };
