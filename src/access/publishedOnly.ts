import { Access } from 'payload/config';

export const publishedOnly: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) {
    return true;
  }

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
};
