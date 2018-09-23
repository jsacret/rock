module.exports.connections = {
  default: {
    user: 'sa',
    password: 'cz7E2J7@8UW7',
    database: 'Rocks',
    dialect: 'mssql',
    options: {
      dialect: 'mssql',
      host   : 'localhost',
      port   : 1433,
      logging: console.log        // or specify sails log level to use ('info', 'warn', 'verbose', etc)
    }
  }
}

