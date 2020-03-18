const configuration = {
  productiondb: `mongodb://${process.env.MONGO1_PORT_27017_TCP_ADDR}:${process.env.MONGO1_PORT_27017_TCP_PORT},${process.env.MONGO2_PORT_27017_TCP_ADDR}:${process.env.MONGO2_PORT_27017_TCP_PORT},${process.env.MONGO3_PORT_27017_TCP_ADDR}:${process.env.MONGO3_PORT_27017_TCP_PORT}
              /coffeeshop?replicaSet=rs&connectTimeoutMS=30000`,
  devdb: `mongodb://${process.env.DOCKER_ENV ||
    '127.0.0.1'}:27017/coffeeshop?connectTimeoutMS=30000`,
};

const loadConfig = () => {
  const connectionString = process.env.MONGODB_CONNECTION_URI;
  if (connectionString && connectionString.indexOf('mongodb://') > -1) {
    return connectionString;
  }
  switch (process.env.NODE_ENV) {
    case 'production':
      return configuration.productiondb;
    default:
      return configuration.devdb;
  }
};

export { loadConfig };
