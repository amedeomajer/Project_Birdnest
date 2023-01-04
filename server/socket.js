const db = require("./config/db.js");
const cron = require('node-cron');
const {createDroneObject, recordClosestPilot} = require('./utils.js');
const axios = require('axios');

const socketServer = (server) => {
	
	
	const io = require("socket.io")(server, {
		cors: {
			origin: "http://localhost:3000",
		},
	});
	cron.schedule('*/2 * * * * *', async () => {
		const data = await axios.get("https://assignments.reaktor.com/birdnest/drones");
		let info = await createDroneObject(data);
		await recordClosestPilot(info);
		io.emit("drones", info); // socket emit data//
		const deleteSQL = 'DELETE FROM pilots WHERE lastSeen < NOW() - INTERVAL 10 MINUTE';
		db.query(deleteSQL, (err, result) => {
			if (err) {
				console.log('error deleting old pilots', err)
			} else if (result.affectedRows > 0) {
				console.log('old pilots deleted')
			}
		})
	});
}

module.exports = {
	socketServer
};