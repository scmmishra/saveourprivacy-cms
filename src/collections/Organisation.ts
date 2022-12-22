import { CollectionConfig } from 'payload/types';
import { enabledOnly } from '../access/enabledOnly';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';

const Organisation: CollectionConfig = {
  slug: 'organisation',
  admin: {
    useAsTitle: 'orgName',
  },
  access: {
    read: enabledOnly,
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
      access: {
        read: () => true,
      },
    },
    {
      name: 'date',
      type: 'date',
      required: false,
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'link',
      label: 'Website',
      type: 'text',
      required: true,
      access: {
        read: () => true,
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
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
      name: 'designation',
      type: 'text',
      access: {
        read: isAdminFieldLevel,
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
      access: {
        read: isAdminFieldLevel,
      },
    },
  ],
};

export default Organisation;
