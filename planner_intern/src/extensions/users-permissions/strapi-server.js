module.exports = (plugin) => {
    plugin.controllers.user.findByEmail = async  function (ctx) {
        const { email } = ctx.params;
        
        const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { email }
        });
        
        if (!entry) {
            return ctx.notFound();
        }

        return ctx.send()
    }

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/taken-emails/:email',
        handler: 'user.findByEmail',
        config: {
            policies: [],
            prefix: '',
        },
    });

    return plugin;
}
