import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Uploads are set to read-only for this demo.',
    group: 'Content',
  },
  upload: {
    adminThumbnail: 'thumbnail',
    disableLocalStorage: true,
    mimeTypes: ['image/png', 'image/jpeg'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
      },
      {
        name: 'portrait',
        width: 768,
        height: 1024,
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      localized: true,
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
