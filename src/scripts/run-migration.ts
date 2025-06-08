// Simple script runner for data migration
import { migrateData } from './migrate-data';

console.log('Starting Sanity data migration...');
migrateData().then(() => {
  console.log('Migration process completed');
  process.exit(0);
}).catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
