import React from 'react'
import { useState, useEffect } from 'react'
import './Visualizer.css'

const Visualizer = ({socket}) => {

	const [ data , setData ] = useState();
	const [drones, setDrones] = useState([]);
	const [pilots, setPilots] = useState([]);
	
	const removeOldPilots = () => {

	}

	useEffect(() => {
		socket.on('drones', (info) => {
				setData(info)
		})
	}, [socket])

	useEffect(() => {
		if (data) {
			let tempDrones = [];
			data.drones.map(drone => {
				const droneStyle = {
					left: Math.floor(drone.x),
					top: Math.floor(500 - drone.y),
					backgroundColor: drone.distance < 100 ? 'red' : 'blue',
					transform: `rotate(${drone.angle}deg)`
				}
				tempDrones.push(
					<div key={drone.serialNumber}>				
						<div className="drone" style={droneStyle}>
							<small style={{color: 'white'}}>{Math.floor(drone.distance)} m</small>
						</div>
					</div>
				)
			})
			data.drones.map(drone => {
				if (drone.distance <= 100) {
					const pilotInfo = JSON.parse(drone.pilotInfo)
					const tempPilot = pilots.filter(pilot => pilot.pilotId !== pilotInfo.pilotId)
					pilotInfo.time = new Date().toLocaleTimeString()
					tempPilot.push(pilotInfo)
					setPilots(tempPilot)
				}
			})
			setDrones(tempDrones)
			// removeOldPilots()
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
			return (
				<li key={pilot.firstName + pilot.lastName}>
					{pilot.firstName} {pilot.lastName} - {pilot.serialNumber} - {pilot.time}
				</li>
			)
		})}
		</ul>
		</>
	)
}

export default Visualizer