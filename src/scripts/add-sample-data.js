import { client } from '../lib/sanity';

async function addSampleData() {
  console.log('🏢 Adding sample location...');
  
  try {
    // Add a sample location
    const sampleLocation = await client.create({
      _type: 'location',
      city: 'Marrakech',
      region: 'Marrakech-Safi',
      country: 'Morocco',
      coordinates: { lat: 31.6295, lng: -7.9811 },
      neighborhood: 'Medina'
    });

    console.log('✓ Location created:', sampleLocation._id);

    // Add sample amenities
    console.log('🏖️ Adding sample amenities...');
    
    const wifi = await client.create({
      _type: 'amenity',
      name: 'Wi-Fi',
      icon: 'Wifi',
      category: 'Technology'
    });

    const pool = await client.create({
      _type: 'amenity',
      name: 'Swimming Pool',
      icon: 'Waves',
      category: 'Recreation'
    });

    console.log('✓ Amenities created');

    // Add sample property
    console.log('🏠 Adding sample property...');
    
    const sampleProperty = await client.create({
      _type: 'property',
      title: 'Test Luxury Riad in Marrakech',
      slug: { current: 'test-luxury-riad-marrakech' },
      description: 'A beautiful test property to verify our Sanity integration is working correctly.',
      shortDescription: 'Test riad for Sanity integration',
      location: { _type: 'reference', _ref: sampleLocation._id },
      price: {
        amount: 1200,
        currency: 'MAD',
        period: 'night'
      },
      specifications: {
        bedrooms: 3,
        bathrooms: 2,
        guests: 6,
        area: 150
      },
      amenities: [
        { _type: 'reference', _ref: wifi._id },
        { _type: 'reference', _ref: pool._id }
      ],
      featured: true,
      category: 'riad'
    });

    console.log('✓ Sample property created:', sampleProperty._id);
    console.log('🎉 Sample data added successfully!');
    console.log('🔗 Visit http://localhost:3002/studio to see your data');
    console.log('🌐 Visit http://localhost:3002/properties to test the frontend');
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

addSampleData();
