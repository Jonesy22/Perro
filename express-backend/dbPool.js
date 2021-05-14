const mariadbHost = process.env.MYSQL_HOST || "localhost";
const mariadbPort = process.env.MYSQL_PORT || "3306";
const mariadbDB = process.env.MYSQL_DATABASE;
const mariadbUser = process.env.MYSQL_USER;
const mariadbPassword = process.env.MYSQL_PASSWORD;

console.log("connecting to db at:", mariadbHost)

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: mariadbHost, 
     port: mariadbPort,
     database: mariadbDB,
     user:mariadbUser, 
     password: mariadbPassword,
     connectionLimit: 10
});

module.exports = pool;