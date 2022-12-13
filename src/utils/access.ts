import { CollectionConfig } from 'payload/types';

const defaultPayloadAccess = ({ req }) => {
  return Boolean(req.user);
};

export function defaultAccessPolicy(
  overrides: CollectionConfig['access'],
): CollectionConfig['access'] {
  return Object.assign(
    {
      create: defaultPayloadAccess,
      read: () => true,
      update: defaultPayloadAccess,
      delete: defaultPayloadAccess,
    },
    overrides,
  );
}
