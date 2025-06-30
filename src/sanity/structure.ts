import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Properties section
      S.listItem()
        .title('Properties')
        .child(
          S.documentTypeList('property')
            .title('All Properties')
            .filter('_type == "property"')
        ),
      
      // Destinations section  
      S.listItem()
        .title('Destinations')
        .child(
          S.documentTypeList('destination')
            .title('All Destinations')
            .filter('_type == "destination"')
        ),
      
      // Support section
      S.listItem()
        .title('Contact & Support')
        .child(
          S.list()
            .title('Contact Management')
            .items([
              S.listItem()
                .title('All Contact Submissions')
                .child(
                  S.documentTypeList('contact')
                    .title('Contact Submissions')
                    .filter('_type == "contact"')
                ),
              S.listItem()
                .title('New Submissions')
                .child(
                  S.documentTypeList('contact')
                    .title('New Contact Submissions')
                    .filter('_type == "contact" && status == "new"')
                ),
              S.listItem()
                .title('Property Applications')
                .child(
                  S.documentTypeList('contact')
                    .title('Property Application Submissions')
                    .filter('_type == "contact" && inquiryType == "property-application"')
                ),
            ])
        ),
      
      // Configuration section
      S.listItem()
        .title('Configuration')
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.listItem()
                .title('Locations')
                .child(
                  S.documentTypeList('location')
                    .title('All Locations')
                    .filter('_type == "location"')
                ),
              S.listItem()
                .title('Amenities')
                .child(
                  S.documentTypeList('amenity')
                    .title('All Amenities')
                    .filter('_type == "amenity"')
                ),
            ])
        ),
      
      // Add remaining document types that might not be covered above
      ...S.documentTypeListItems().filter(listItem => 
        !['property', 'destination', 'contact', 'location', 'amenity'].includes(listItem.getId() || '')
      ),
    ])
