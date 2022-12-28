import { CollectionAfterChangeHook } from 'payload/types';
import { CollectionAfterDeleteHook } from 'payload/types';
import { ofetch } from 'ofetch';

async function triggerVercelDeploy(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[DEV] Mock Vercel Deploy');
    return;
  }

  const response = await ofetch(process.env.VERCEL_DEPLOY_URL, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to trigger Vercel deploy: ${response.statusText}`);
  }
}

export const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (operation === 'create' || operation === 'update') {
    if (doc._status === 'published') {
      await triggerVercelDeploy();
    }
    if (doc._status === 'draft' && previousDoc._status === 'published') {
      console.log('Unpublishing a document, triggering Vercel deploy...');
      await triggerVercelDeploy();
    }
  }
};

export const afterDeleteHook: CollectionAfterDeleteHook = async () => {
  console.log('Deleting a document, triggering Vercel deploy...');
  await triggerVercelDeploy();
};
