'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up permissions for authenticated users to access trades
    const pluginStore = strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    const authenticatedRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'authenticated' } });

    if (authenticatedRole) {
      const permissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: {
            role: authenticatedRole.id,
          },
        });

      // Define the permissions we need for trades
      const tradePermissions = [
        { action: 'api::trade.trade.find' },
        { action: 'api::trade.trade.findOne' },
        { action: 'api::trade.trade.create' },
        { action: 'api::trade.trade.update' },
        { action: 'api::trade.trade.delete' },
      ];

      // Enable each permission
      for (const permConfig of tradePermissions) {
        const existingPermission = permissions.find(
          (p) => p.action === permConfig.action
        );

        if (existingPermission && !existingPermission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: existingPermission.id },
              data: { enabled: true },
            });
          console.log(`✅ Enabled permission: ${permConfig.action}`);
        } else if (!existingPermission) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({
              data: {
                action: permConfig.action,
                role: authenticatedRole.id,
                enabled: true,
              },
            });
          console.log(`✅ Created permission: ${permConfig.action}`);
        }
      }

      console.log('✅ Trade permissions configured for authenticated users');
    }
  },
};
