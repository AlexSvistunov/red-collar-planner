'use strict';

const { errors } = require('@strapi/utils');
const { NotFoundError } = errors;
/**
 * event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event.event', ({strapi}) => ({
    async join(eventId, user) {
        const event = await this.findOne(eventId, {
            populate: ['participants']
        });

        if (!event) {
            throw new NotFoundError('event not found');
        }

        const { participants } = event;

        return await strapi.entityService.update('api::event.event', eventId, {
            data: {
              participants: [...participants, user]
            }
        });
    },
    async leave(eventId, user) {
        const event = await this.findOne(eventId, {
            populate: ['participants']
        });

        if (!event) {
            throw new NotFoundError('event not found');
        }

        const { participants } = event;
        const excludeUserPartisipants = participants.filter(participant => participant.id !== user.id);

        return await strapi.entityService.update('api::event.event', eventId, {
            data: {
              participants: excludeUserPartisipants
            }
        });
    },
  async create(params, owner) {
      return strapi.entityService.create('api::event.event', {
        data: {
          ...params,
          owner
        }
      });
  },
}));
