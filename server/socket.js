const db = require("./db");
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
		io.emit("drones", info); // socket emit data//
		const ok = await recordClosestPilot(info);
		const deleteSQL = `DELETE FROM pilots WHERE lastSeen < (NOW() - '10 minutes'::interval)`;
		const deletedPilots = await db.query(deleteSQL);
		if (deletedPilots.rowCount > 0) {
			console.log('deleted pilots', deletedPilots.rowCount)
		}
	});
}

module.exports = {
	socketServer
};