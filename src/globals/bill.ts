import { GlobalConfig, Block } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { globalAfterChangeHook } from '../utils/deploy';

const PartBlock: Block = {
  slug: 'part-block',
  fields: [
    {
      name: 'number',
      type: 'text',
      label: 'Part Number',
    },
  ],
};

const SectionBlock: Block = {
  slug: 'section-block',
  fields: [
    {
      name: 'body',
      label: 'Section Body',
      type: 'richText',
    },
  ],
};

const ChapterBlock: Block = {
  slug: 'chapter-block',
  fields: [
    {
      name: 'sections',
      type: 'blocks',
      minRows: 1,
      blocks: [SectionBlock, PartBlock],
    },
  ],
};

// schema
// chat

const Bill: GlobalConfig = {
  slug: 'bill',
  admin: {
    group: 'Pages',
  },
  hooks: {
    afterChange: [globalAfterChangeHook],
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Opening',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Long Title',
              required: true,
            },
            {
              name: 'introduction',
              label: 'Introduction',
              type: 'richText',
              required: true,
            },
            {
              name: 'preamble',
              label: 'Preamble',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Body',
          fields: [
            {
              name: 'chapters',
              type: 'blocks',
              minRows: 0,
              maxRows: 10,
              blocks: [ChapterBlock],
            },
            {
              name: 'schedule',
              type: 'richText',
              label: 'Schedule',
            },
          ],
        },
      ],
    },
  ],
};

export default Bill;
