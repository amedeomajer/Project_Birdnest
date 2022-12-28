const { default: axios } = require("axios")
const express = require("express")
const http = require('http');
const app = express()
const server = http.createServer(app);
const socketServer = require('./socket.js');
const port = 5000
const cors = require('cors')




app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.get("/drones", (request, response) => {
axios
	.get("https://assignments.reaktor.com/birdnest/drones")
	.then((result) => response.send(result.data))
})

app.get("/pilots/:id", (request, response) => {
	const id = request.params.id
	axios
		.get(`https://assignments.reaktor.com/birdnest/pilots/${id}`)
		.then((result) => response.json(result.data))
})



socketServer.socketServer(server);
server.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})