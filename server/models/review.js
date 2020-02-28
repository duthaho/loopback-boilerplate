export default function(Review) {
  Review.beforeRemote('create', (context, user, next) => {
    context.args.data.reviewerId = context.req.accessToken.userId;
    next();
  });
}
