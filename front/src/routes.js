import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

export const route = [
	{
		path: '/',
		element: Home,
		exact: true,
		auth: false,
	},

	{
		path: '/auth',
		element: Auth,
		exact: false,
		auth: false,
	},

	{
		path: '/new-workout',
		element: NewWorkout,
		exact: false,
		auth: true,
	},
]
