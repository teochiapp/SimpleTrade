module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/trades',
      handler: 'trade.find'
    },
    {
      method: 'GET',
      path: '/trades/:id',
      handler: 'trade.findOne'
    },
    {
      method: 'POST',
      path: '/trades',
      handler: 'trade.create'
    },
    {
      method: 'PUT',
      path: '/trades/:id',
      handler: 'trade.update'
    },
    {
      method: 'DELETE',
      path: '/trades/:id',
      handler: 'trade.delete'
    }
  ]
};
