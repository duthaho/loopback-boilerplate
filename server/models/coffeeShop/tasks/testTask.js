export default (CoffeeShop) => {
  CoffeeShop.testTask = ({ name }, done) => {
    console.log(name, 'testTask');
    done();
  };
};
