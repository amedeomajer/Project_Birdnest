// Drone positions
// GET assignments.reaktor.com/birdnest/drones

// The monitoring equipment endpoint above provides a snapshot of all the drones within a 500 by 500 meter square and is updated about once every 2 seconds. The equipment is set up right next to the nest.

// This snapshot is in XML format and contains, among other things, the position and serial number of each drone in the area.

// The position of the drones are reported as X and Y coordinates, both floating point numbers between 0-500000
// The no-fly zone is a circle with a 100 meter radius, origin at position 250000,250000
// Pilot information
// GET assignments.reaktor.com/birdnest/pilots/:serialNumber

// The national drone registry endpoint above will provide you the name, contact information and other details for a drone's registered owner in JSON format, based on the given serial number. Please note on a rare occasion pilot information may not be found, indicated by a 404 status code.

// In order to protect the privacy of well behaved pilots keeping appropriate distance, you may only query this information for the drones violating the NDZ.
import axios from 'axios';
import { convertXML } from 'simple-xml-to-json'
import { calculateDistance } from '../utils/calculateDistance';
const baseUrl = 'http://localhost:5000/'

const createDroneObject = (drone) => {
	let	droneObject = {};

	// console.log(drone.drone.children);
	droneObject.serialNumber = drone.drone.children[0].serialNumber.content;
	droneObject.x = drone.drone.children[8].positionX.content / 1000;
	droneObject.y = drone.drone.children[7].positionY.content / 1000;
	droneObject.distance = calculateDistance({x : droneObject.x, y : droneObject.y});

	return	droneObject;
}

export const getDrones = async () => {
	let	info = {};
	const data = await axios.get(`${baseUrl}drones`)
	let		drones = [];
	const	myJson = convertXML(data.data);
	
	info.time = myJson.report.children[1].capture.snapshotTimestamp;
	myJson.report.children[1].capture.children.forEach(element => {
		drones.push(createDroneObject(element))
	});
	info.drones = drones;

	return	info;
};

export const getPilot = async (serialNumber) => {
	return await axios.get(`${baseUrl}pilots/${serialNumber}`);
};


