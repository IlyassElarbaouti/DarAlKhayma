require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

// Create client with the same configuration as the API route
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-24',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

console.log('Configuration:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uekmuuz9');
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production');
console.log('Token exists:', !!process.env.SANITY_API_TOKEN);

async function testPermissions() {
  try {
    console.log('Testing Sanity client permissions...');
    
    // Test document creation
    const testDoc = {
      _type: 'contact',
      name: 'Test User Permission Check',
      email: 'test@example.com',
      phone: '123456789',
      inquiryType: 'general',
      subject: 'Permission Test',
      message: 'Testing if we can create documents',
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    
    const result = await client.create(testDoc);
    console.log('✅ Success! Document created:', result._id);
    
    // Clean up - delete the test document
    await client.delete(result._id);
    console.log('✅ Test document cleaned up');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Status Code:', error.statusCode);
    
    if (error.statusCode === 403) {
      console.log('\n🔧 SOLUTION: Your Sanity API token lacks create permissions.');
      console.log('   1. Go to https://www.sanity.io/manage');
      console.log('   2. Select your project');
      console.log('   3. Go to API section');
      console.log('   4. Create a new token with "Editor" or "Admin" permissions');
      console.log('   5. Update SANITY_API_TOKEN in .env.local');
    }
  }
}

testPermissions();
