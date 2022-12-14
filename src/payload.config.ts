import { buildConfig } from 'payload/config';
import path from 'path';

import Users from './collections/Users';
import Blog from './collections/Blog';
import Coverage from './collections/Coverage';
import Organisation from './collections/Organisation';
import Individual from './collections/Individual';
import Authors from './collections/Authors';
import Media from './collections/Media';

import Principles from './globals/principles';
import Bill from './globals/bill';

import { adapter } from './utils/s3';

import seo from '@payloadcms/plugin-seo';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';

export default buildConfig({
  serverURL: process.env.SERVER_URL ?? 'http://localhost:4000',
  admin: {
    disable: false,
    user: Users.slug,
  },
  globals: [Principles, Bill],
  collections: [Users, Authors, Blog, Coverage, Individual, Organisation, Media],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    seo({
      collections: ['blog'],
      uploadsCollection: 'media',
      globals: ['principles', 'bill'],
      tabbedUI: true,
    }),
    cloudStorage({
      collections: {
        media: {
          adapter: adapter, // see docs for the adapter you want to use
        },
      },
    }),
  ],
});
