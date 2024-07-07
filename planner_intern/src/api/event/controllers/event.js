'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({strapi}) => ({
    async join(ctx) {
        const { params, state } = ctx;
        const { id } = params;

        return await strapi.service("api::event.event").join(id, state.user);
    },
    async leave(ctx) {
        const { params, state } = ctx;
        const { id } = params;

        return await strapi.service("api::event.event").leave(id, state.user);
    },
    async create(ctx) {
      const { request, state } = ctx;
      const sanitizedData = await this.sanitizeInput(request.body.data, ctx);

      return strapi.service("api::event.event").create(sanitizedData, state.user);
    }
}));
