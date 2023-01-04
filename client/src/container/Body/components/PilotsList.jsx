import { useState, useEffect } from 'react'
import '../Body.css'
import { getPilots } from '../../../services/requests'
import { pad } from '../../../utils';

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
			{pilots.map(pilot => {
				const hours = pad(pilot.lastSeen.getHours());
				const minutes = pad(pilot.lastSeen.getMinutes());
				const seconds = pad(pilot.lastSeen.getSeconds());
				return (
					<div className='pilot-element' key={pilot.pilotId}>
						<p>{hours}:{minutes}:{seconds} -- {pilot.name} {pilot.lastName}</p>
						<p>{pilot.phone} - - {pilot.email}</p>
					</div>
				)
			})}
		</div>
	)
}

export default PilotsList