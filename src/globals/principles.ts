import { GlobalConfig, Block } from 'payload/types';
import { afterChangeHook } from '../utils/deploy';

const PrincipleBlock: Block = {
  slug: 'principle-block',
  fields: [
    // required
    {
      name: 'name',
      type: 'text',
      label: 'Principle Name',
      required: true,
    },
    {
      name: 'prinicpleBody',
      type: 'richText',
      required: true,
    },
  ],
};

const Principles: GlobalConfig = {
  slug: 'principles',
  admin: {
    group: 'Pages',
  },
  hooks: {
    afterChange: [afterChangeHook],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Opening',
          fields: [
            {
              name: 'body',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Principles',
          description: 'Principles to be shown',
          fields: [
            {
              name: 'layout', // required
              type: 'blocks', // required
              minRows: 1,
              maxRows: 10,
              blocks: [
                // required
                PrincipleBlock,
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Principles;
