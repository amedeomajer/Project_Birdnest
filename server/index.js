const db = require("./db");
const express = require("express")
const http = require('http');
const app = express()
const server = http.createServer(app);
const socketServer = require('./socket.js');
const port = process.env.PORT || 5000
const cors = require('cors');

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get("/api/distance", async (request, response) => {
	const { rows } = await db.query('SELECT * FROM closest_distance_recorded')
	response.send(rows[0]);
})

app.get("/api/pilots", async (request, response) => {
	const { rows } = await db.query('SELECT * FROM pilots ORDER BY lastSeen DESC');
	response.send(rows);
})



socketServer.socketServer(server);
server.listen(process.env.PORT | port, () => {
	console.log(`server listening on port ${port}`)
})


