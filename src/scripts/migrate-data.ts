// Data migration script to populate Sanity with mock data
import { client } from '../lib/sanity';
import { mockProperties } from '../lib/mockData';

// Helper function to create or update documents
async function createOrUpdateDocument(doc: any) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`✓ Created/Updated: ${doc._type} - ${doc.title || doc.name}`);
    return result;
  } catch (error) {
    console.error(`✗ Failed to create ${doc._type}:`, error);
    return null;
  }
}

// Migration functions
async function migrateLocations() {
  console.log('\n🏢 Migrating Locations...');
  
  const uniqueLocations = mockProperties.reduce((acc: any[], property) => {
    const location = property.location;
    const existing = acc.find(l => l.city === location.city && l.region === location.region);
    
    if (!existing) {
      acc.push({
        _id: `location-${location.city.toLowerCase().replace(/\s+/g, '-')}`,
        _type: 'location',
        city: location.city,
        region: location.region,
        country: location.country,
        coordinates: location.coordinates,
        neighborhood: location.neighborhood
      });
    }
    
    return acc;
  }, []);

  for (const location of uniqueLocations) {
    await createOrUpdateDocument(location);
  }
  
  return uniqueLocations;
}

async function migrateAmenities() {
  console.log('\n🏖️ Migrating Amenities...');
  
  const uniqueAmenities = mockProperties.reduce((acc: any[], property) => {
    property.amenities.forEach(amenity => {
      const existing = acc.find(a => a.name === amenity.name);
      if (!existing) {
        acc.push({
          _id: `amenity-${amenity.name.toLowerCase().replace(/\s+/g, '-')}`,
          _type: 'amenity',
          name: amenity.name,
          icon: amenity.icon,
          category: amenity.category
        });
      }
    });
    return acc;
  }, []);

  for (const amenity of uniqueAmenities) {
    await createOrUpdateDocument(amenity);
  }
  
  return uniqueAmenities;
}

async function migrateDestinations() {
  console.log('\n🌍 Migrating Destinations...');
  
  const uniqueCities = [...new Set(mockProperties.map(p => p.location.city))];
  const destinations = uniqueCities.map(city => {
    const cityProperties = mockProperties.filter(p => p.location.city === city);
    const sampleProperty = cityProperties[0];
    
    return {
      _id: `destination-${city.toLowerCase().replace(/\s+/g, '-')}`,
      _type: 'destination',
      name: city,
      description: `Discover the beauty and charm of ${city}, Morocco. Experience luxury accommodations in this stunning destination.`,
      shortDescription: `Luxury rentals in ${city}`,
      region: sampleProperty.location.region,
      country: sampleProperty.location.country,
      coordinates: sampleProperty.location.coordinates,
      featured: ['Marrakech', 'Casablanca', 'Fes'].includes(city),
      propertyCount: cityProperties.length,
      averagePrice: Math.round(cityProperties.reduce((sum, p) => sum + p.price.amount, 0) / cityProperties.length)
    };
  });

  for (const destination of destinations) {
    await createOrUpdateDocument(destination);
  }
  
  return destinations;
}

async function migrateProperties(locations: any[], amenities: any[]) {
  console.log('\n🏠 Migrating Properties...');
  
  for (const property of mockProperties) {
    // Find matching location reference
    const locationRef = locations.find(l => 
      l.city === property.location.city && l.region === property.location.region
    );
    
    // Map amenity references
    const amenityRefs = property.amenities.map(amenity => {
      const amenityDoc = amenities.find(a => a.name === amenity.name);
      return amenityDoc ? { _type: 'reference', _ref: amenityDoc._id } : null;
    }).filter(Boolean);

    const sanityProperty = {
      _id: `property-${property.slug}`,
      _type: 'property',
      title: property.title,
      slug: { current: property.slug },
      description: property.description,
      shortDescription: property.shortDescription,
      // Note: Images would need to be uploaded to Sanity's asset system
      // For now, we'll create placeholder image objects
      images: property.images.map((img, index) => ({
        _key: `image-${index}`,
        _type: 'image',
        alt: img.alt,
        // In real migration, you'd upload these URLs to Sanity assets
        asset: {
          _type: 'reference',
          _ref: `image-${property.id}-${index}` // Placeholder reference
        }
      })),
      location: locationRef ? { _type: 'reference', _ref: locationRef._id } : null,
      price: property.price,
      specifications: property.specifications,
      amenities: amenityRefs,
      bookingLinks: property.bookingLinks || [],
      featured: property.featured || false,
      category: property.category,
      rating: property.rating || { average: 4.5, count: 0 }
    };

    await createOrUpdateDocument(sanityProperty);
  }
}

// Main migration function
export async function migrateData() {
  console.log('🚀 Starting data migration to Sanity...');
  console.log(`📊 Found ${mockProperties.length} properties to migrate`);
  
  try {    // Migrate in order due to references
    const locations = await migrateLocations();
    const amenities = await migrateAmenities();
    const _destinations = await migrateDestinations();
    await migrateProperties(locations, amenities);
    
    console.log('\n✅ Migration completed successfully!');
    console.log('📝 Note: Image assets need to be uploaded manually to Sanity or via asset API');
    console.log('🎨 Visit your Sanity Studio to review and edit the migrated content');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData();
}
