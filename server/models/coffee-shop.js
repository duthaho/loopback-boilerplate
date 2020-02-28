import getStatusRoute from './coffeeShop/routes/getStatus';
import getNameRoute from './coffeeShop/routes/getName';

export default function(CoffeeShop) {
  getStatusRoute(CoffeeShop);
  getNameRoute(CoffeeShop);
}
