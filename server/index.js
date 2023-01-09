const db = require("./db");
const express = require("express")
const http = require('http');
const app = express()
const server = http.createServer(app);
const socketServer = require('./socket.js');
const port = 5000
const cors = require('cors');

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.get("/distance", async (request, response) => {
	const { rows } = await db.query('SELECT * FROM closest_distance_recorded')
	response.send(rows[0]);
})

app.get("/pilots", async (request, response) => {
	const { rows } = await db.query('SELECT * FROM pilots ORDER BY lastSeen DESC');
	response.send(rows);
})



socketServer.socketServer(server);
server.listen(process.nextTick.PORT | port, () => {
	console.log(`server listening on port ${port}`)
})


