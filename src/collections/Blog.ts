import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
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
  access: {
    // create: isAdmin,
    create: () => true,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
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
