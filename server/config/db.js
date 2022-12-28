const mysql = require('mysql');

const con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	queueLimit : 15000
});

con.connect((error) => {
	if (error) console.log(error)
	else {
		con.query("CREATE DATABASE IF NOT EXISTS bird_nest", (error, result) => {
			if (error)
				throw new Error('failed to create bird_nest db');
			else
				console.log('created db')
		})
	}
});

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'bird_nest'
});

const createTable = () => {
	try {
		con.query("USE bird_nest", (error, result) => {
			if (error)
				throw new Error('failed to use bird_nest db');
		})
		con.query(`CREATE TABLE IF NOT EXISTS pilots (
			id INT(11) AUTO_INCREMENT PRIMARY KEY,
			name VARCHAR(20),
			lastName VARCHAR(20),
			email VARCHAR(200),
			phone VARCHAR(20),
			lastSeen DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		)`, (error, result) => {
			if (error)
				throw new Error('failed to create pilots table');
			else
				console.log('created pilots table')
		})
	} catch (error) {
		console.log(error);
	}
}

createTable();



module.exports = db;

