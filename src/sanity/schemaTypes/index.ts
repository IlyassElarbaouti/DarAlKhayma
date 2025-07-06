import { type SchemaTypeDefinition } from 'sanity'

// Import our custom schemas from the main schemas directory
import property from '../schemas/property'
import location from '../schemas/location'
import amenity from '../schemas/amenity'
import destination from '../schemas/destination'
import contact from '../schemas/contact'
import review from '../schemas/review'
import teamMember from '../schemas/teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    property,
    location,
    amenity,
    destination,
    contact,
    review,
    teamMember,
  ],
}
