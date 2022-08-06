import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'
// @desc 		Add new workout
// @route 	POST /api/workouts
// @access 	Private

export const addNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
	})
	res.json(workout)
})
/* 
	[x] - Workout&exercise  log model
	[] - GET workout with list exercises
	[] - Get exercise page with previous result
	[] - Update exercise log times + completed
	[] - Update workoutLog completed
	[] - Update exercise & workouts
	[] - Delete exercise & workouts
	[] - Get statistics for profile
*/
