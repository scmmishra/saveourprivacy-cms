import { CollectionConfig } from 'payload/types';

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
    read: ({ req: { user } }) => {
      // users who are authenticated will see all posts
      if (user) {
        return true;
      }

      // query publishDate to control when posts are visible to guests
      return {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      };
    },
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
