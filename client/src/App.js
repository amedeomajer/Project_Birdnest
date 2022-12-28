import React, { useEffect, useState } from 'react';


import { Header, Footer, Visualizer } from './container'
import { getPilot } from './services/requests';

import io from 'socket.io-client';


const App = () => {
	const socket = io.connect("http://localhost:5000");

	return (
		<div className='app'>
			<Header />
			<Visualizer socket={socket}/>
			<Footer />
		</div>
	);
}

export default App;