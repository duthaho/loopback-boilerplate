import { CreateTask } from '../../../services/TaskManager';

export default (CoffeeShop) => {
  CoffeeShop.getName = (id, req, callback) => {
    CoffeeShop.findById(id, (err, instance) => {
      if (err) {
        return callback(err);
      }
      if (!instance) {
        return callback(new Error('err.coffeeShop.notExists'));
      }
      CreateTask('TEST_TASK', { name: instance.name });
      callback(null, instance.name);
    });
  };

  CoffeeShop.remoteMethod('getName', {
    accepts: [
      {
        arg: 'id',
        type: 'string',
        http: {
          source: 'path',
        },
      },
      {
        arg: 'data',
        type: 'object',
        http: {
          source: 'req',
        },
      },
    ],
    http: {
      path: '/getName/:id',
      verb: 'get',
    },
    returns: {
      arg: 'result',
      type: 'string',
    },
  });
};
