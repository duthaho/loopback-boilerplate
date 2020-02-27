import { emailDs } from '../email/email-config';
import { storageDs } from '../s3/storage-config';

module.exports = {
  mongodb: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    url: process.env.MONGO_URL,
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    name: 'mongodb',
    connector: 'mongodb',
    allowExtendedOperators: true,
    useNewUrlParser: true
  },
  emailDs,
  storage: storageDs
};
