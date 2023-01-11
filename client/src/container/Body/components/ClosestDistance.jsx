import React from 'react'
import { useEffect, useState } from 'react'
import { getClosestDistance } from '../../../services/requests'

const ClosestDistance = ({data}) => {
	const [distance, setDistance] = useState();

	useEffect(() => {
		getClosestDistance().then((response) => {
			if (response.data !== '') {
				response.data.time = new Date(response.data.lastseen)
				setDistance(response.data)
			}
		})
	}, [])

	useEffect(() => {
		if (data && distance) {
			console.log('data.drones', data.drones)
			const newDrones = data.drones.sort((a, b) => a.distance - b.distance)
			console.log('new drones', newDrones)
			if (newDrones[0].distance <= distance.distance) {
				setDistance({
					distance : newDrones[0].distance,
					time : new Date(data.time)
				})
			}
		}
	}, [data])

	if (distance) {
		const date = distance.time.toLocaleString();
		return (
			<div className="closest-distance" >
				<h2>Closest recorded distance :</h2>
				<h3>{distance.distance} m</h3>
				<h3>recorded at {date}</h3>
			</div>
		)
	} else {
		return <h1>Loading ...</h1>
	}
	
}

export default ClosestDistance