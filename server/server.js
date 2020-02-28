import loopback from 'loopback';
import execute from 'loopback-boot/lib/executor';
import compiler from 'loopback-boot/lib/compiler';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = (module.exports = loopback());

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

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
