import { GlobalConfig, Block } from 'payload/types';

const SectionBlock: Block = {
  slug: 'section-block',
  fields: [
    // required
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
    },
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
    // required
    {
      name: 'title',
      type: 'text',
      label: 'Chapter Name',
      required: true,
    },
    {
      name: 'sections',
      type: 'blocks',
      minRows: 1,
      maxRows: 10,
      blocks: [SectionBlock],
    },
  ],
};

const Bill: GlobalConfig = {
  slug: 'bill',
  admin: {
    group: 'Pages',
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
          ],
        },
      ],
    },
  ],
};

export default Bill;
