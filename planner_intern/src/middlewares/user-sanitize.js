'use strict';

const sanitizeItem = (item, user) => {
  // check if user is not undefined
  if (user) {
    // check if user id is same as the item.id (user from request)
    if (user.id === item.id) {
      // if it's same return full object
      return item;
    }
  }
  const { username, id } = item;
    
  return { username, id};
}

/**
 * `user-sanitize` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // before controller
    await next();
    // after controller
    // we need to check if the reponse is correct, 
    // otherwise we will have error message in the data
    if (ctx.response.status === 200) {
      // get the authenticated user, if no user - undefined
      const { user } = ctx.state;
      // get data from response
      let data = ctx.response.body;
      // check if data is array
      if (Array.isArray(data)) {
        // run sanitize function for each element
        data = data.map(item => sanitizeItem(item, user))
      } else {
        // else run for single item
        data = sanitizeItem(data, user);
      }
      // apply result to response
      ctx.response.body = data;
    }

  };
};
