import { type SchemaTypeDefinition } from 'sanity'

// Import our custom schemas
import property from '../../../sanity/schemas/property'
import location from '../../../sanity/schemas/location'
import amenity from '../../../sanity/schemas/amenity'
import destination from '../../../sanity/schemas/destination'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    property,
    location,
    amenity,
    destination,
  ],
}
