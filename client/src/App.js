import React, { useEffect, useState } from 'react';


import { Header, Footer } from './container'
import { getDrones, getPilot } from './services/requests';


const App = () => {
	const[ data , setData ]= useState();
	useEffect(() => {
		getDrones().then((response) => {
			setData(response)
		})
	}, [])


	// })
	return (
		<div className='app'>
			<Header />
			<Footer />
		</div>
	);
}

export default App;