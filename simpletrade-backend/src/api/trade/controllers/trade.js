'use strict';

/**
 * trade controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::trade.trade', ({ strapi }) => ({
  // Override the default create method to set the user
  async create(ctx) {
    const { user } = ctx.state;
    const { data } = ctx.request.body;

    console.log('🔍 CREATE - Usuario autenticado:', user?.id);

    const entity = await strapi.entityService.create('api::trade.trade', {
      data: {
        ...data,
        user: user.id
      },
      populate: ['user']
    });

    console.log('🔍 CREATE - Trade creado:', entity.id);
    return { data: entity };
  },

  // Override the default update method to check ownership  
  async update(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    console.log('🔍 UPDATE - Usuario:', user?.id, 'Trade:', id);

    // Check if the trade belongs to the user
    const existingTrade = await strapi.entityService.findOne('api::trade.trade', id, {
      populate: ['user']
    });

    if (!existingTrade) {
      return ctx.notFound('Trade no encontrado');
    }

    const existingUserId = existingTrade.user?.id != null ? Number(existingTrade.user.id) : null;
    const currentUserId = user?.id != null ? Number(user.id) : null;

    if (!currentUserId) {
      return ctx.unauthorized('Usuario no autenticado');
    }

    if (existingUserId && existingUserId !== currentUserId) {
      return ctx.unauthorized('No tienes permisos para modificar este trade');
    }

    const entity = await strapi.entityService.update('api::trade.trade', id, {
      data: {
        ...data,
        user: existingUserId || currentUserId
      },
      populate: ['user']
    });

    console.log('🔍 UPDATE - Trade actualizado:', entity.id);
    return { data: entity };
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    console.log('🗑️ DELETE - Eliminando trade:', id, 'para usuario:', user?.id);

    if (!user || !user.id) {
      return ctx.unauthorized('Usuario no autenticado');
    }

    // Verificar que el trade existe y pertenece al usuario
    const existingTrade = await strapi.entityService.findOne('api::trade.trade', id, {
      populate: ['user']
    });

    if (!existingTrade || existingTrade.user.id !== user.id) {
      return ctx.unauthorized('No tienes permisos para eliminar este trade');
    }

    const entity = await strapi.entityService.delete('api::trade.trade', id);

    console.log('✅ DELETE - Trade eliminado:', id);
    return { data: entity };
  }
}));
