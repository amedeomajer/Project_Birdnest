const mysql = require('mysql');


const con = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: ''
});

con.connect(async (error) => {
	if (error) console.log(error)
	else {
		con.query("CREATE DATABASE IF NOT EXISTS bird_nest", async (error, result) => {
			console.log('here')
			if (error)
				console.log('failed to create bird_nest db');
			else {
				console.log('created db')
				await createTables();
				
			}
		})
	}
});

const createTables = async () => {
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
			pilotId VARCHAR(70),
			lastSeen DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
		)`, (error, result) => {
			if (error)
				throw new Error('failed to create pilots table');
			else
				console.log('created pilots table')
		})
		con.query(`CREATE TABLE IF NOT EXISTS closest_distance_recorded (
			id INT(11) AUTO_INCREMENT PRIMARY KEY,
			lastSeen DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			distance DOUBLE(17, 11)
		)`, (error, result) => {
			if (error)
				throw new Error('failed to create closest distance table');
			else {
				con.query('SELECT * FROM closest_distance_recorded', (error, result) => {
					if (error)
						throw new Error('failed to select from closest distance table');
					else{
						console.log('created closest distance table')
						process.exit();
					}
				})
			}
		})
	} catch (error) {
		console.log(error);
	}
}
