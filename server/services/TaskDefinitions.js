export default {
  TEST_TASK: (params) => ({
    title: `Test: ${params.name}`,
    targetRoutine: 'models.CoffeeShop.testTask',
  }),
};
