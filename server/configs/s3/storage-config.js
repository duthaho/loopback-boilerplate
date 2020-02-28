export const storageDs = {
  name: 'storage',
  connector: 'loopback-component-storage',
  region: 'eu-central-1',
  provider: 'amazon',
  key: process.env.AWS_SECRET_ACCESS_KEY,
  keyId: process.env.AWS_ACCESS_KEY_ID,
};
