import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'
// @desc 		Create new workout
// @route 	POST /api/workouts
// @access 	Private

export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
	})
	res.json(workout)
})

// @desc 		Get workout
// @route 	GET /api/workout/:id
// @access 	Private

export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await Workout.findById(req.params.id)
		.populate('exercises')
		.lean()

	const minutes = Math.ceil(workout.exercises.length * 3.7)
	res.json({ ...workout, minutes })
})

/* 
	[x] - Workout&exercise  log model
	[x] - GET workout with list exercises with calc minutes
	[x] - Create exercisesLog by exercise in workout
	[x] - Get exercise page with previous result
	[x] - Update exercise log times + completed
	[x] - Update exerciseLog completed
	[x] - Create workoutLog completed
	[] - Update exercise & workouts
	[] - Delete exercise & workouts
	[] - Get statistics for profile
*/
