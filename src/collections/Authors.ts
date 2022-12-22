import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    defaultColumns: ['name', 'bio', 'user'],
    useAsTitle: 'name',
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
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
  ],
};

export default Authors;
