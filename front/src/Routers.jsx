import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'
import Error404 from './components/pages/404'
import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
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
