'use strict';

module.exports = function(Campaign) {
  Campaign.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.authorId = req.accessToken.userId;
    next();
  });
};
