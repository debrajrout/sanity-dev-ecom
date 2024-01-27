import {defineConfig} from 'sanity'

import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'dev-sanity',

  projectId: 'jp2kvw9u',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
