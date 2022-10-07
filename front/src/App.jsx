import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import Error404 from './components/pages/Error404'
import { useAuth } from './hooks/useAuth'
import { route } from './dataRoutes'
import Auth from './components/pages/Auth/Auth'

const App = () => {
	const { isAuth } = useAuth()

	return (
		<Router>
			<Routes>
				{route.map(item => {
					if (item.auth && !isAuth) {
						return (
							<Route
								key={`route ${item.path}`}
								path={item.path}
								element={<Auth />}
							/>
						)
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
				{/* <Route exact element={Error404} /> */}
				{/* <Route exact path='/' element={<Home />}></Route>
				<Route path='/new-workout' element={<NewWorkout />}></Route>
				<Route path='/auth' element={<Auth />}></Route> */}
			</Routes>
		</Router>
	)
}

export default App
