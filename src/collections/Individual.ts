import { CollectionConfig } from 'payload/types';

const Individual: CollectionConfig = {
  slug: 'individual',
  admin: {
    useAsTitle: 'email',
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
