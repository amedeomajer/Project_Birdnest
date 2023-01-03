const { default: axios } = require("axios")
const express = require("express")
const http = require('http');
const app = express()
const server = http.createServer(app);
const socketServer = require('./socket.js');
const port = 5000
const cors = require('cors');
const db = require("./config/db.js");




app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.get("/drones", (request, response) => {
axios
	.get("https://assignments.reaktor.com/birdnest/drones")
	.then((result) => response.send(result.data))
})

app.get("/pilots", (request, response) => {
	db.query('SELECT * FROM pilots ORDER BY lastSeen DESC', (err, result) => {
		if (err) {
			console.log('error getting pilots', err)
		} else {
			response.send(result)
		}
	})
})



socketServer.socketServer(server);
server.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})