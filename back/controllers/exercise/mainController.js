import asyncHandler from 'express-async-handler'
import Exercise from '../../models/exerciseModel.js'
// @desc 		Create new exercise
// @route 	POST /api/exercises
// @access 	Private

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, image } = req.body

	const exercise = await Exercise.create({
		name,
		times,
		image,
	})
	res.json(exercise)
})
