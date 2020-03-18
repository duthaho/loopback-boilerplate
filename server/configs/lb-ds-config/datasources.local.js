import { ReadPreference } from 'mongodb';

import { emailDs } from '../email/email-config';
import { storageDs } from '../s3/storage-config';
import { loadConfig } from '../mongo/mongodb-config';

module.exports = {
  mongodb: {
    url: loadConfig(),
    name: 'mongodb',
    connector: 'mongodb',
    readPreference: ReadPreference.PRIMARY,
    w: 1,
    journal: true,
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
