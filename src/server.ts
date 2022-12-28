import express from 'express';
import payload from 'payload';
import path from 'path';

require('dotenv').config();
const app = express();
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
  email: {
    transportOptions: {
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      port: process.env.SMTP_PORT,
      secure: process.env.NODE_ENV === 'production', // use TLS
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    },
    fromName: 'IFF Admin',
    fromAddress: 'admin@internetfreedom.in',
  },
});

// Add your own express routes here
app.listen(4000);
