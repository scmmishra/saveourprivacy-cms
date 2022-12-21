import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';

const Coverage: CollectionConfig = {
  slug: 'coverage',
  admin: {
    defaultColumns: ['title', 'link', 'date', 'source'],
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    create: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description:
          'This is the link to the article, should start with an http:// or https://',
      },
      required: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'This link will show up chronologically based on this date',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'dateOfPublication',
      type: 'date',
      admin: {
        description: 'The date at which the article was published',
      },
      required: true,
    },
    {
      name: 'source',
      label: 'Source / Publisher / Author',
      type: 'text',
      required: true,
    },
  ],
};

export default Coverage;
