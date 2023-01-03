import React, {useState, useEffect} from 'react'
import '../Body.css'

const Visualizer = ({data}) => {

	const [ drones, setDrones ] = useState([]);

	useEffect(() => {
		if (data) {
			const tempDrones = data.drones.map(drone => {
				const droneStyle = {
					left: Math.floor(drone.x),
					top: Math.floor(500 - drone.y),
					backgroundColor: drone.distance < 100 ? 'red' : 'green',
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
		}
	}, [data])

	return (
		<div className='monitor'>
				<div className='outer-circle'></div>
				<div className='inner-circle'></div>
				<div className='rotator'></div>
				{drones}
		</div>
	)
}

export default Visualizer