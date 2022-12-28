import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { publishedOnly } from '../access/publishedOnly';
import { afterChangeHook, afterDeleteHook } from '../utils/deploy';
import { formatSlug } from '../utils/string';

const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    defaultColumns: ['title', 'authorString', 'category', 'tags', 'status'],
    useAsTitle: 'title',
    group: 'Content',
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
  hooks: {
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
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
