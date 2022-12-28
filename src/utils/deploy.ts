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
    parseResponse: JSON.parse,
  });

  if (!response.job) {
    throw new Error(`Failed to trigger Vercel deploy`);
  }
}

export const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  if (operation === 'update') {
    console.log('Updating a document, triggering Vercel deploy...');
    await triggerVercelDeploy();
  }

  if (operation === 'create' && doc._status === 'published') {
    console.log('Created a new published document, triggering Vercel deploy...');
    await triggerVercelDeploy();
  }
};

export const afterDeleteHook: CollectionAfterDeleteHook = async () => {
  console.log('Deleting a document, triggering Vercel deploy...');
  await triggerVercelDeploy();
};
