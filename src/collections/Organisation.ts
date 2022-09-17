import { CollectionConfig } from 'payload/types';

const Organisation: CollectionConfig = {
  slug: 'organisation',
  admin: {
    useAsTitle: 'orgName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'orgName',
      label: 'Organisation Name',
      type: 'text',
      required: true,
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
