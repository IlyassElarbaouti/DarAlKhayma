import { type SchemaTypeDefinition } from 'sanity'

// Import our schemas with simplified property schema for debugging
import property from '../schemas/property-simple'
import location from '../schemas/location'
import amenity from '../schemas/amenity'
import destination from '../schemas/destination'
import contact from '../schemas/contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    property,
    location,
    amenity,
    destination,
    contact,
  ],
}
