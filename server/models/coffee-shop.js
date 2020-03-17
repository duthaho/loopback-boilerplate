import getStatusRoute from './coffeeShop/routes/getStatus';
import getNameRoute from './coffeeShop/routes/getName';
import testTask from './coffeeShop/tasks/testTask';

export default function(CoffeeShop) {
  // routes
  getStatusRoute(CoffeeShop);
  getNameRoute(CoffeeShop);

  // tasks
  testTask(CoffeeShop);
}
