import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Blog from './collections/Blog';
import Coverage from './collections/Coverage';
import Organisation from './collections/Organisation';
import Individual from './collections/Individual';
import Principles from './globals/principles';

import seo from '@payloadcms/plugin-seo';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Blog, Coverage, Individual, Organisation],
  globals: [Principles],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    seo({
      collections: ['blog'],
      globals: ['principles'],
      tabbedUI: true,
    }),
  ],
});
