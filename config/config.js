require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  auth: {
    secretKey: 'secret_key_myapp',
  },
};
