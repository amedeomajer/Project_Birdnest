import { useState, useEffect } from 'react'
import '../Body.css'
import { getPilots } from '../../../services/requests'
import { pad } from '../../../utils';

const PilotsList = ({data}) => {
	const [ pilots, setPilots ] = useState([]);

	useEffect(() => {
		getPilots().then(response => {
			if (response.data !== undefined) {
				response.data.forEach(pilot => {
					pilot.lastseen = new Date(pilot.lastseen)
				})
				setPilots(response.data)
			}
		})
	}, [data])

	return (
		<div className='pilots-list'>
			{pilots.map(pilot => {
				const hours = pad(pilot.lastseen.getHours());
				const minutes = pad(pilot.lastseen.getMinutes());
				const seconds = pad(pilot.lastseen.getSeconds());
				return (
					<div className='pilot-element' key={pilot.pilotid}>
						<p>{hours}:{minutes}:{seconds} -- {pilot.name} {pilot.lastname}</p>
						<p>{pilot.phone} - - {pilot.email}</p>
					</div>
				)
			})}
		</div>
	)
}

export default PilotsList