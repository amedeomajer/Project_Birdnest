import React from 'react'
import { useState, useEffect } from 'react'
import './Body.css'
import PilotsList from './components/PilotsList'
import Visualizer from './components/Visualizer'
import ClosestDistance from './components/ClosestDistance'



const Body = ({socket}) => {

	const [ data , setData ] = useState();

		socket.on('drones', (info) => {
			console.log(new Date().getSeconds())
			setData(info)
		})

	return (
		<div className='visualizer-list-container'>
			<Visualizer data={data} />
			<PilotsList data={data} />
			<ClosestDistance data={data} />
		</div>
	)
}

export default Body