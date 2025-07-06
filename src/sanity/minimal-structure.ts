import type {StructureResolver} from 'sanity/structure'

// Minimal structure configuration to avoid crashes
export const minimalStructure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.documentTypeListItem('property').title('Properties'),
      S.documentTypeListItem('destination').title('Destinations'),
      S.documentTypeListItem('contact').title('Contact'),
      S.documentTypeListItem('location').title('Locations'),
      S.documentTypeListItem('amenity').title('Amenities'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['property', 'destination', 'contact', 'location', 'amenity'].includes(listItem.getId() || '')
      ),
    ])
