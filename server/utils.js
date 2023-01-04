const { convertXML } = require('simple-xml-to-json');
const axios = require('axios');
const db = require('./config/db.js');

const recordClosestPilot = async (info) => { // shits not working

	db.query('SELECT distance FROM closest_distance_recorded', (error, result) => {
		if (error)
			console.log(error)
		else {
			const old_distance = result[0] === undefined ? undefined : result[0].distance;
			const distances = info.drones.map((drone) => drone.distance)
			distances.sort((a, b) => a - b)
			if (old_distance === undefined) {
				db.query('INSERT INTO closest_distance_recorded (distance) VALUES (?)', [distances[0]],
				(error, result) => {
					if (error)
						console.log(error)
				})
			} else if (old_distance >= distances[0]) {
				db.query('UPDATE closest_distance_recorded SET distance = ?, lastSeen = NOW() WHERE distance = ?', [distances[0] ,old_distance],
				(error, result) => {
					if (error)
					console.log(error)
				})
			}
		}
	})
}

const calculateDistance = ( coordinates ) => {
	// const nestCoordinates = { x : 250 , y : 250 };

	const x1 = coordinates.x;
	const y1 = coordinates.y;
	const x2 = 250;
	const y2 = 250;
	const distance = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

	return distance;
}

const getPilotInfo = async (drone) => {
		let pilotInfo = {};
		const result = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber}`)
		if (result.status !== 404) {
			const firstName = result.data.firstName;
			const lastName = result.data.lastName;
			const email = result.data.email;
			const phone = result.data.phoneNumber;
			const pilotId = result.data.pilotId;
			pilotInfo.name = firstName;
			pilotInfo.lastName = lastName;
			pilotInfo.email = email;
			pilotInfo.phone = phone;
			pilotInfo.pilotId = result.data.pilotId;

			const checkIfALreadyPresentSQL = 'SELECT * FROM pilots WHERE email = ? AND phone = ? AND name = ? AND lastName = ?';
			db.query(checkIfALreadyPresentSQL, [email, phone, firstName, lastName], (err, result) => {
				if (err) {
					console.log(err)
				} else if (result.length === 0) {
					const insertSQL = 'INSERT INTO pilots (name, lastName, email, phone, pilotId) VALUES (?, ?, ?, ?, ?)';
					db.query(insertSQL, [firstName, lastName, email, phone, pilotId], (err, result) => {
						if (err) {
							console.log(err)
						}
					})
				} else {
					const updateSQL = 'UPDATE pilots SET lastSeen = NOW() WHERE id = ?';
					db.query(updateSQL, [result[0].id], (err, result) => {
						if (err) {
							console.log(err)
						}
					})
				}
			})

			return JSON.stringify(pilotInfo);
		} else {
			return null;
		}
}

const prepareDroneObject = async (drone) => {
	let	droneObject = {};

	droneObject.serialNumber = drone.drone.children[0].serialNumber.content;
	droneObject.x = drone.drone.children[8].positionX.content / 1000;
	droneObject.y = drone.drone.children[7].positionY.content / 1000;
	droneObject.distance = calculateDistance({x : droneObject.x, y : droneObject.y});
	if (droneObject.distance <= 100) {
		droneObject.pilotInfo = await getPilotInfo(droneObject);
	}
	return	droneObject;
}

const createDroneObject = async (data) => {
	let info = {};
	let drones = [];
	const myJson = convertXML(data.data);

	info.time = myJson.report.children[1].capture.snapshotTimestamp;
	for (i = 0 ;i < myJson.report.children[1].capture.children.length; i++) {
		const d = await prepareDroneObject(myJson.report.children[1].capture.children[i]);
		drones.push(d);
	}
	info.drones = drones;

	return info;
}

module.exports = {
	createDroneObject,
	recordClosestPilot,
}