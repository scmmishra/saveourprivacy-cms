import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';

const Individual: CollectionConfig = {
  slug: 'individual',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
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
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'organisation',
      type: 'text',
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'designation',
      type: 'text',
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'declaration',
      type: 'checkbox',
      label: 'Indian Citizen above 18',
      access: {
        read: isAdminFieldLevel,
      },
    },
  ],
};

export default Individual;
