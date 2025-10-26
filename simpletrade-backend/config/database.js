module.exports = {
  connection: {
    client: 'sqlite',
    connection: {
      filename: './database/data.db'
    },
    useNullAsDefault: true
  }
};