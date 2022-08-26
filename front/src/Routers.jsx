import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'

import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

const Routers = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />}></Route>
				<Route path='/new-workout' element={<NewWorkout />}></Route>
				<Route path='/auth' element={<Auth />}></Route>
			</Routes>
		</Router>
	)
}

export default Routers
