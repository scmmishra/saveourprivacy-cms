import { CollectionConfig } from 'payload/types';
import { defaultAccessPolicy } from '../utils/access';

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    defaultColumns: ['name', 'bio', 'user'],
    useAsTitle: 'name',
  },
  access: defaultAccessPolicy(),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
  ],
};

export default Authors;
