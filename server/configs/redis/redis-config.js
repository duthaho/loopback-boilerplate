import IORedis from 'ioredis';
import _ from 'lodash';

/* eslint no-unreachable:0 */
const dev = {
  devHost: process.env.DOCKER_ENV || '127.0.0.1',
  devPort: 6379,
  devSentinelPort: 26379,
};

const loadConfig = () => {
  let config = {
    // sentinels: [{ host: dev.devHost, port: dev.devSentinelPort }],
    host: dev.devHost,
    port: dev.devPort,
    name: 'redis1',
    queueName: 'queue',
  };
  switch (process.env.NODE_ENV) {
    case 'production':
      config = {
        sentinels: [
          {
            host: process.env.SENTINEL1_PORT_26379_TCP_ADDR,
            port: process.env.SENTINEL1_PORT_26379_TCP_PORT,
          },
          {
            host: process.env.SENTINEL2_PORT_26379_TCP_ADDR,
            port: process.env.SENTINEL2_PORT_26379_TCP_PORT,
          },
          {
            host: process.env.SENTINEL3_PORT_26379_TCP_ADDR,
            port: process.env.SENTINEL3_PORT_26379_TCP_PORT,
          },
        ],
        name: 'redis1',
        queueName: 'production',
      };
      break;
    case 'staging':
      config = {
        sentinels: [
          {
            host: process.env.SENTINEL1_PORT_26379_TCP_ADDR,
            port: process.env.SENTINEL1_PORT_26379_TCP_PORT,
          },
        ],
        name: 'redis1',
        queueName: 'staging',
      };
      break;
    default:
      break;
  }
  const sentinelsString = process.env.REDIS_SENTINELS;
  const sentinelName = process.env.REDIS_SENTINEL_NAME;
  const db = process.env.REDIS_DB;
  const password = process.env.REDIS_PASSWORD;
  if (sentinelsString) {
    config.sentinels = sentinelsString
      .split(',')
      .map((host) => ({ host, port: dev.devSentinelPort }));
  }
  if (sentinelName) {
    config.name = sentinelName;
  }
  if (db) {
    config.db = db;
  }
  if (password) {
    config.password = password;
  }
  return config;
};

const createIOClient = (params) => {
  const conf = loadConfig();
  const connectionString = process.env.REDIS_CONNECTION;
  const configObj = _.isObject(params) ? params : {};
  // REMOTE CONNECTION CONFIGURATION
  if (connectionString && connectionString.indexOf('redis://') > -1) {
    return new IORedis(connectionString, configObj);
  }
  return new IORedis({ ...conf, ...configObj });
};

export { loadConfig, createIOClient };
