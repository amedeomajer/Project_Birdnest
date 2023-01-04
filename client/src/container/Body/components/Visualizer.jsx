import React, {useState, useEffect} from 'react'
import '../Body.css'
import radarSound from '../../../assets/radar-sound-effect.mp3'
import audioOn from '../../../assets/audio-icon-on.png'
import audioOff from '../../../assets/audio-icon-off.png'

const Visualizer = ({data}) => {

	const [ drones, setDrones ] = useState([]);
	const [ activeAudio, setActiveAudio ] = useState(false);
	const audio = new Audio(radarSound)

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
			if (activeAudio === true)
			audio.play().catch((error) => {
				console.log('user has not interacted with page')
			})
		}
	}, [data])
	const changeAudioOnOff = () => {
		if (activeAudio === true)
			setActiveAudio(false)
		else
			setActiveAudio(true)
	}
	return (
		<div className='monitor'>
				<button onClick={() => {changeAudioOnOff()}}><img className="audio-icon" src={activeAudio ? audioOn : audioOff} /></button>
				<div className='outer-circle'></div>
				<div className='inner-circle'></div>
				<div className='nest'></div>
				{drones}
		</div>
	)
}

export default Visualizer