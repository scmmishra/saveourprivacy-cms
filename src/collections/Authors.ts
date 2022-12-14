import { CollectionConfig } from 'payload/types';

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    defaultColumns: ['name', 'bio', 'user'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
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
    {
      name: 'user',
      unique: true,
      type: 'relationship',
      relationTo: 'users',
    },
  ],
};

export default Authors;
