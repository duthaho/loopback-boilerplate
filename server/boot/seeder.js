import async from 'async';

export default (app) => {
  // data sources
  const { mongodb } = app.dataSources;

  // create reviewers
  const createReviewers = (cb) => {
    mongodb.automigrate('Reviewer', (err) => {
      if (err) return cb(err);
      const { Reviewer } = app.models;
      Reviewer.create(
        [
          {
            email: 'foo@bar.com',
            password: 'foobar',
          },
          {
            email: 'john@doe.com',
            password: 'johndoe',
          },
          {
            email: 'jane@doe.com',
            password: 'janedoe',
          },
        ],
        cb,
      );
    });
  };

  // create coffee shops
  const createCoffeeShops = (cb) => {
    mongodb.automigrate('CoffeeShop', (err) => {
      if (err) return cb(err);
      const { CoffeeShop } = app.models;
      CoffeeShop.create(
        [
          {
            name: 'Bel Cafe',
            city: 'Vancouver',
          },
          {
            name: 'Three Bees Coffee House',
            city: 'San Mateo',
          },
          {
            name: 'Caffe Artigiano',
            city: 'Vancouver',
          },
        ],
        cb,
      );
    });
  };

  // create reviews
  const createReviews = (reviewers, coffeeShops, cb) => {
    mongodb.automigrate('Review', (err) => {
      if (err) return cb(err);
      const { Review } = app.models;
      Review.create(
        [
          {
            rating: 5,
            content: 'A very good coffee shop.',
            reviewerId: reviewers[0].id,
            coffeeShopId: coffeeShops[0].id,
          },
          {
            rating: 5,
            content: 'Quite pleasant.',
            reviewerId: reviewers[1].id,
            coffeeShopId: coffeeShops[0].id,
          },
          {
            rating: 4,
            content: 'It was ok.',
            reviewerId: reviewers[1].id,
            coffeeShopId: coffeeShops[1].id,
          },
          {
            rating: 4,
            content: 'I go here everyday.',
            reviewerId: reviewers[2].id,
            coffeeShopId: coffeeShops[2].id,
          },
        ],
        cb,
      );
    });
  };

  // create all models
  async.parallel(
    {
      reviewers: async.apply(createReviewers),
      coffeeShops: async.apply(createCoffeeShops),
    },
    (err, results) => {
      if (err) throw err;
      createReviews(results.reviewers, results.coffeeShops, () => {
        console.log('> models created sucessfully');
      });
    },
  );
};
