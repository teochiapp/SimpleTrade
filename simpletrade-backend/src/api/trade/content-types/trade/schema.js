/**
 * Trade content type
 */

module.exports = {
  kind: 'collectionType',
  collectionName: 'trades',
  info: {
    singularName: 'trade',
    pluralName: 'trades',
    displayName: 'Trade',
    description: 'Trading operations'
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    i18n: {
      localized: false
    }
  },
  attributes: {
    symbol: {
      type: 'string',
      required: true,
      maxLength: 10
    },
    type: {
      type: 'enumeration',
      enum: ['buy', 'sell'],
      required: true
    },
    entry_price: {
      type: 'decimal',
      required: true
    },
    exit_price: {
      type: 'decimal'
    },
    portfolio_percentage: {
      type: 'decimal'
    },
    stop_loss: {
      type: 'decimal'
    },
    take_profit: {
      type: 'decimal'
    },
    strategy: {
      type: 'string',
      maxLength: 100
    },
    emotions: {
      type: 'enumeration',
      enum: ['confident', 'nervous', 'greedy', 'fearful', 'calm', 'frustrated']
    },
    notes: {
      type: 'text'
    },
    status: {
      type: 'enumeration',
      enum: ['open', 'closed', 'cancelled'],
      default: 'open'
    },
    result: {
      type: 'decimal'
    },
    closed_at: {
      type: 'datetime'
    },
    user: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::users-permissions.user',
      required: true
    }
  }
};
