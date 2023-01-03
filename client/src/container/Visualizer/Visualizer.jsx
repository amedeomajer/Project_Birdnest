import React from 'react'
import { useState, useEffect } from 'react'
import './Visualizer.css'
import { getPilots } from '../../services/requests'

function pad(n) { // adds the 0 before sigle digits hours, minutes and seconds
	return n.toString().padStart(2, '0');
}

const Visualizer = ({socket}) => {

	const [ data , setData ] = useState();
	const [ drones, setDrones ] = useState([]);
	const [ pilots, setPilots ] = useState([]);
	
	const removeOldPilots = () => {
		const tempPilots = pilots.filter((pilot) => {
			const now = new Date();
			if ((now - pilot.lastSeen) >= 600000)
				return false;
			else
				return true;
		})
		setPilots(tempPilots)
	}

	useEffect(() => {
		getPilots().then(response => {
			response.data.forEach(pilot => {
				pilot.lastSeen = new Date(pilot.lastSeen)
			})
			setPilots(response.data)
		})
	}, [])

	useEffect(() => {
		socket.on('drones', (info) => {
				setData(info)
		})
	}, [socket])

	useEffect(() => {
		if (data) {
			const tempDrones = data.drones.map(drone => {
				const droneStyle = {
					left: Math.floor(drone.x),
					top: Math.floor(500 - drone.y),
					backgroundColor: drone.distance < 100 ? 'red' : 'blue',
				}
				return (
					<div key={drone.serialNumber}>
						<div className="drone" style={droneStyle}>
							<small style={{color: 'white'}}>{Math.floor(drone.distance)} m</small>
						</div>
					</div>
				)
			})
			setDrones(tempDrones)

			data.drones.forEach(drone => {
				if (drone.distance <= 100) {
					const pilotInfo = JSON.parse(drone.pilotInfo);
					const tempPilots = pilots.filter(pilot => pilot.pilotId !== pilotInfo.pilotId);
					pilotInfo.lastSeen = new Date();
					tempPilots.unshift(pilotInfo);
					setPilots(tempPilots);
				}
			})
			removeOldPilots();
		}
	}, [data])

	return (
		<>
		<div className='monitor'>
			<div className='outer-circle'></div>
			<div className='inner-circle'></div>
			<div className='rotator'></div>
			{drones}
		</div>
		<ul>
			{pilots.map(pilot => {
				const hours = pad(pilot.lastSeen.getHours());
				const minutes = pad(pilot.lastSeen.getMinutes());
				const seconds = pad(pilot.lastSeen.getSeconds());
				return (
					<li key={pilot.pilotId}>
						{pilot.name} 
						{pilot.lastName} - 
						{pilot.pilotId} - 
						{hours}:{minutes}:{seconds}
					</li>
				)
			})}
		</ul>
		</>
	)
}

export default Visualizer