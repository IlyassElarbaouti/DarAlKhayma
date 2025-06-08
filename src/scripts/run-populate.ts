// Run this script to populate your Sanity database
import { populateSanityDatabase } from './populate-sanity';

console.log('🚀 Starting database population...');

populateSanityDatabase()
  .then(() => {
    console.log('\n✅ Database population completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database population failed:', error);
    process.exit(1);
  });
