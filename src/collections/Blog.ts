import { CollectionConfig } from 'payload/types';
import { defaultAccessPolicy } from '../utils/access';
import { formatSlug } from '../utils/string';

const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    defaultColumns: ['title', 'authorString', 'category', 'tags', 'status'],
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: defaultAccessPolicy({
    read: ({ req: { user } }) => {
      // users who are authenticated will see all posts
      if (user) {
        return true;
      }

      // query publishDate to control when posts are visible to guests
      return {
        and: [
          {
            publishDate: {
              less_than: new Date().toJSON(),
            },
            _status: {
              equals: 'published',
            },
          },
        ],
      };
    },
  }),
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'author',
      hasMany: true,
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'authorString',
      label: 'Author',
      type: 'text',
    },
    {
      name: 'publishDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Posts will not be public until this date',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
};

export default Blog;
