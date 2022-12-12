import { CollectionConfig } from 'payload/types';

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      return {
        and: [
          {
            publishDate: {
              less_than: new Date().toJSON(),
            },
            _status: {
              equals: 'published',
            },
          },
        ],
      };
    },
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
