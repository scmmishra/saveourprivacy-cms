import { CollectionConfig } from 'payload/types';
import { isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelfFieldLevel } from '../access/isAdminOrSelf';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['public'],
      required: true,
      access: {
        read: isAdminOrSelfFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: ['admin', 'public'],
    },
  ],
};

export default Users;
