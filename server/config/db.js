const mysql = require('mysql');
const dotenv = require('dotenv')

const db = mysql.createConnection({
	host: process.env.RDS_HOSTNAME,
	port: process.env.RDS_PORT,
	user: process.env.RDS_USERNAME,
	password: process.env.RDS_PASSWORD,
	database: process.env.RDS_DB_NAME
});

module.exports = db;

