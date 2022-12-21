import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Organisation: CollectionConfig = {
  slug: 'organisation',
  admin: {
    useAsTitle: 'orgName',
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'orgName',
      label: 'Organisation Name',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: false,
    },
    {
      name: 'link',
      label: 'Website',
      type: 'text',
      required: true,
    },
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
      name: 'designation',
      type: 'text',
    },
  ],
};

export default Organisation;
