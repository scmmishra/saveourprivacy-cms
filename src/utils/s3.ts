import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

const adapter = s3Adapter({
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  },
  bucket: process.env.S3_BUCKET,
  acl: 'public-read',
});

export { adapter };
