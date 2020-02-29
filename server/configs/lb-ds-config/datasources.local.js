import { emailDs } from '../email/email-config';
import { storageDs } from '../s3/storage-config';

module.exports = {
  mongodb: {
    url: process.env.MONGO_URL,
    name: 'mongodb',
    connector: 'mongodb',
    allowExtendedOperators: true,
    enableOptimisedfindOrCreate: true,
    useNewUrlParser: true,
    reconnectTries: 100,
    reconnectInterval: 1000,
    autoReconnect: true,
  },
  emailDs,
  storage: storageDs,
};
