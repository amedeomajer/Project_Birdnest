import { useState, useEffect } from 'react'
import '../Body.css'
import { getPilots } from '../../../services/requests'

function pad(n) { // adds the 0 before sigle digits hours, minutes and seconds
	return n.toString().padStart(2, '0');
}

const PilotsList = ({data}) => {
	const [ pilots, setPilots ] = useState([]);

	useEffect(() => {
		getPilots().then(response => {
			response.data.forEach(pilot => {
				pilot.lastSeen = new Date(pilot.lastSeen)
			})
			setPilots(response.data)
		})
	}, [data])

	return (
		<div className='pilots-list'>
			<ul>
				{pilots.map(pilot => {
					console.log(pilot)
					const hours = pad(pilot.lastSeen.getHours());
					const minutes = pad(pilot.lastSeen.getMinutes());
					const seconds = pad(pilot.lastSeen.getSeconds());
					return (
						<li key={pilot.pilotId}>
							{pilot.name} {pilot.lastName} - {pilot.pilotId} - {hours}:{minutes}:{seconds}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default PilotsList