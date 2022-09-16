import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Blog from './collections/Blog';
import Coverage from './collections/Coverage';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Blog,
    Coverage
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
