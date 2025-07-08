// Quick test to check what's in Sanity
const { client } = require('./src/lib/sanity.ts');

async function testSanityData() {
  try {
    console.log('Testing Sanity connection...\n');
    
    // Test basic connection
    const datasets = await client.datasets.list();
    console.log('✅ Connected to Sanity');
    console.log('Datasets:', datasets.map(d => d.name));
    
    // Test properties
    console.log('\n📋 Testing Properties...');
    const properties = await client.fetch(`*[_type == "property"][0...3]`);
    console.log(`Found ${properties.length} properties`);
    if (properties.length > 0) {
      console.log('First property:', properties[0].title);
    }
    
    // Test destinations  
    console.log('\n🗺️ Testing Destinations...');
    const destinations = await client.fetch(`*[_type == "destination"][0...3]`);
    console.log(`Found ${destinations.length} destinations`);
    if (destinations.length > 0) {
      console.log('First destination:', destinations[0].name || destinations[0].city);
    }
    
    // Test reviews
    console.log('\n⭐ Testing Reviews...');
    const reviews = await client.fetch(`*[_type == "review"][0...3]`);
    console.log(`Found ${reviews.length} reviews`);
    if (reviews.length > 0) {
      console.log('First review by:', reviews[0].name);
    }
    
    // Test team members
    console.log('\n👥 Testing Team Members...');
    const team = await client.fetch(`*[_type == "teamMember"][0...3]`);
    console.log(`Found ${team.length} team members`);
    if (team.length > 0) {
      console.log('First team member:', team[0].name);
    }
    
    console.log('\n🎯 Summary:');
    console.log(`Properties: ${properties.length}`);
    console.log(`Destinations: ${destinations.length}`);
    console.log(`Reviews: ${reviews.length}`);
    console.log(`Team Members: ${team.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSanityData();
