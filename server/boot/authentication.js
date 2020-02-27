module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();
  const loopback = server.loopback;
  const accessTokenModel = loopback.getModelByType(loopback.AccessToken);

  server.middleware(
    'auth',
    loopback.token({
      model: accessTokenModel,
      currentUserLiteral: 'me'
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    server.middleware('initial:before', (req, res, next) => {
      console.log('url', req.method, req.url);
      next();
    });
  }
};
