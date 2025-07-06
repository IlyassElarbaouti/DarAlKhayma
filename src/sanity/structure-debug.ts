import type {StructureResolver} from 'sanity/structure'

// Simplified structure for debugging
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dar Al Khayma Studio')
    .items([
      S.listItem()
        .title('Properties')
        .child(
          S.documentTypeList('property')
            .title('All Properties')
        ),
      
      S.listItem()
        .title('Destinations')
        .child(
          S.documentTypeList('destination')
            .title('All Destinations')
        ),
      
      S.listItem()
        .title('Contact Submissions')
        .child(
          S.documentTypeList('contact')
            .title('Contact Submissions')
        ),
      
      S.listItem()
        .title('Locations')
        .child(
          S.documentTypeList('location')
            .title('All Locations')
        ),
      
      S.listItem()
        .title('Amenities')
        .child(
          S.documentTypeList('amenity')
            .title('All Amenities')
        ),
    ])
