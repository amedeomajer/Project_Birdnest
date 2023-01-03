import React from 'react';


import { Header, Footer, Body } from './container';

import io from 'socket.io-client';


const App = () => {
	const socket = io.connect("http://localhost:5000");

	return (
		<div className='app'>
			<Header />
			<Body socket={socket}/>
			<Footer />
		</div>
	);
}

export default App;