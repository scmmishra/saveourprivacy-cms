import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Individual: CollectionConfig = {
  slug: 'individual',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdmin,
    create: () => true,
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
      name: 'date',
      type: 'date',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'designation',
      type: 'text',
    },
    {
      name: 'declaration',
      type: 'checkbox',
      label: 'Indian Citizen above 18',
    },
  ],
};

export default Individual;
