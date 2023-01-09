const dotenv = require('dotenv').config();
const { Pool } = require('pg');
// const pool = new Pool({
// 	user: process.env.USERNAME,
// 	host: process.env.HOSTNAME,
// 	database: process.env.DB_NAME,
// 	password: process.env.PASSWORD,
// 	port: process.env.PORT,
// });
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'birdnest_monitron',
	password: '123456',
	port: '5433',
});

module.exports = {
	query : (text, params) => pool.query(text, params),
}

