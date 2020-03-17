import loopback from 'loopback';
import execute from 'loopback-boot/lib/executor';
import compiler from 'loopback-boot/lib/compiler';
import path from 'path';
import dotenv from 'dotenv';
import async from 'async';

dotenv.config();

// eslint-disable-next-line import/first
import { initQueue } from './services/queue/bullQueue';

const app = (module.exports = loopback());
let httpServer;
let queue;

app.start = () => {
  const startQueue = (cb) => {
    initQueue(app, cb);
  };
  const startHttp = (cb) => {
    httpServer = app.listen(cb);
  };
  const methods = {
    queue: startQueue,
    http: startHttp,
  };

  async.parallel(methods, (err, result) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line prefer-destructuring
    queue = result.queue;
    app.set('trust proxy', app.get('cookieSecure') === true);
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('*** API HTTP listening at: %s ***', baseUrl);
    console.log('*** API QUEUE running');
    app.emit('started');
  });
};

/* eslint no-process-exit:0 */
process.on('SIGINT', () => {
  const methods = [];
  if (httpServer && typeof httpServer.close === 'function') {
    methods.push((cb) => {
      console.log('*** graceful shutdown HTTP ***');
      httpServer.close((err) => {
        cb(err);
      });
    });
  }
  if (queue && typeof queue.close === 'function') {
    methods.push((cb) => {
      console.log('*** graceful shutdown Queue ***');
      queue
        .close()
        .then(() => {
          cb();
        })
        .catch((err) => {
          cb(err);
        });
    });
  }

  async.parallel(methods, (err) => {
    process.exit(err ? 1 : 0);
  });
});

const bootOptions = {
  appRootDir: __dirname,
  componentRootDir: path.join(__dirname, './configs/lb-component-config'),
  middlewareRootDir: path.join(__dirname, './configs/lb-middleware-config'),
  appConfigRootDir: path.join(__dirname, './configs/lb-config'),
  dsRootDir: path.join(__dirname, './configs/lb-ds-config'),
  modelsRootDir: path.join(__dirname, './configs/lb-model-config'),
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
const lbBootCompiled = compiler(bootOptions);
execute(app, lbBootCompiled, (err) => {
  if (err) {
    throw err;
  }
  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
