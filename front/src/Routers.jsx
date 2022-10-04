import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error404 from './components/pages/Error404'
import { useAuth } from './hooks/useAuth'
import { route } from './dataRoutes'

const Routers = () => {
	const { isAuth } = useAuth()
	return (
		<BrowserRouter>
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
				<Route exact element={Error404} />
				{/* <Route exact path='/' element={<Home />}></Route>
				<Route path='/new-workout' element={<NewWorkout />}></Route>
				<Route path='/auth' element={<Auth />}></Route> */}
			</Routes>
		</BrowserRouter>
	)
}

export default Routers
