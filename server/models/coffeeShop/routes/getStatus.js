export default (CoffeeShop) => {
  CoffeeShop.status = (req, callback) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const OPEN = 6;
    const CLOSE = 20;

    let response;
    if (currentHour > OPEN && currentHour < CLOSE) {
      response = 'Open';
    } else {
      response = 'Close';
    }
    callback(null, response);
  };

  CoffeeShop.remoteMethod('status', {
    accepts: {
      arg: 'data',
      type: 'object',
      http: {
        source: 'req',
      },
    },
    http: {
      path: '/status',
      verb: 'get',
    },
    returns: {
      arg: 'result',
      type: 'string',
    },
  });
};
