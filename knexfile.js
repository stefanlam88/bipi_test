require('dotenv').config({ path: '.env' });

const dbUsername = process.env.DBUSERNAME || 'postgres';
const dbPassword = process.env.DBPASSWORD || 'postgres';
const dbHost = process.env.DBHOST || 'localhost';
const dbPort = process.env.DBPORT || '5432';
const dbName = process.env.DBNAME || 'merchantDB';

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  },


};
