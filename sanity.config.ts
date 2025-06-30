'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './src/sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure,
      // Add default document views
      defaultDocumentNode: (S, {schemaType}) => {
        // Add different views for different schema types
        switch (schemaType) {
          case 'property':
            return S.document().views([
              S.view.form(),
            ])
          case 'destination':
            return S.document().views([
              S.view.form(),
            ])
          default:
            return S.document().views([S.view.form()])
        }
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
