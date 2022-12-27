import { Block, CollectionConfig, GlobalConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const FAQBlock: Block = {
  slug: 'faq-block',
  fields: [
    // required
    {
      name: 'question',
      type: 'text',
      label: 'Question',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
  ],
};

const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Pages',
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
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              label: 'Title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'blocks',
              minRows: 1,
              maxRows: 4,
              blocks: [FAQBlock],
            },
          ],
        },
      ],
    },
  ],
};

export default Homepage;
