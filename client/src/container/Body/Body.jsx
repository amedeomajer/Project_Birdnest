import React from 'react'
import { useState, useEffect } from 'react'
import './Body.css'
import PilotsList from './components/PilotsList'
import Visualizer from './components/Visualizer'



const Body = ({socket}) => {

	const [ data , setData ] = useState();

	useEffect(() => {
		socket.on('drones', (info) => {
			setData(info)
		})
	}, [socket])

	

	return (
		<div className='visualizer-list-container'>
			<Visualizer data={data} />
			<PilotsList data={data} />
		</div>
	)
}

export default Body