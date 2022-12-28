import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '../access/isAdminOrSelf';
import { generateEmail } from '../utils/email';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 5, // 5 minutes
    forgotPassword: {
      generateEmailSubject(args) {
        return `Reset Password | SaveOurPrivacy`;
      },
      generateEmailHTML: async ({ req, token, user }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `https://${process.env.SERVER_URL}/admin/reset?token=${token}`;

        return await generateEmail(
          `Forgot your password? Let's get you a new one.`,
          `It is okay to forget your password once a while, but it's not okay to forget that you are awesome. So let's get you a new password.`,
          {
            label: 'Reset your password',
            link: resetPasswordURL,
          },
          `If you didn't request a password reset, you can safely ignore this email.`,
        );
      },
    },
  },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
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
