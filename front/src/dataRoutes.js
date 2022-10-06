import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import NewExercise from './components/pages/NewExercise/NewExercise'
import Profile from './components/pages/Profile/Profile'

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
	{
		path: '/new-exercise',
		element: NewExercise,
		exact: false,
		auth: true,
	},
	{
		path: '/profile',
		element: Profile,
		exact: false,
		auth: true,
	},
]
