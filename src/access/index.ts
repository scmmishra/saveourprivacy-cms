import { CollectionConfig } from 'payload/types';
import { isAdminOrSelf } from './isAdminOrSelf';

export function defaultAccessPolicy(
  overrides: CollectionConfig['access'] = {},
): CollectionConfig['access'] {
  return Object.assign(
    {
      create: isAdminOrSelf,
      read: isAdminOrSelf,
      update: isAdminOrSelf,
      delete: isAdminOrSelf,
    },
    overrides,
  );
}
