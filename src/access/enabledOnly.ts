import { Access } from 'payload/config';

export const enabledOnly: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) {
    return true;
  }

  return {
    enabled: {
      equals: true,
    },
  };
};
