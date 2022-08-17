import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />}></Route>
				<Route path='/new-workout' element={<NewWorkout />}></Route>
			</Routes>
		</Router>
	)
}

export default App
