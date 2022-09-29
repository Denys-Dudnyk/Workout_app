import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useAuth } from './hooks/useAuth'
import { route } from './routes'

const Routers = () => {
	const { isAuth } = useAuth()
	return (
		<Router>
			<Routes>
				{route.map(item => {
					if (item.auth && !isAuth) {
						return false
					}
					return (
						<Route
							exact={item.exact}
							path={item.path}
							element={<item.element />}
							key={`route ${item.path}`}
						/>
					)
				})}
				{/* <Route element={Error404} /> */}
				{/* <Route exact path='/' element={<Home />}></Route>
				<Route path='/new-workout' element={<NewWorkout />}></Route>
				<Route path='/auth' element={<Auth />}></Route> */}
			</Routes>
		</Router>
	)
}

export default Routers
