import type {StructureResolver} from 'sanity/structure'

// Simple structure configuration for troubleshooting
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Use the default structure for all document types
      ...S.documentTypeListItems(),
    ])
