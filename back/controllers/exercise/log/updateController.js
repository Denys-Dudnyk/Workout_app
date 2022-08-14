import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'

// @desc 		Update exercise log
// @route 	PUT /api/exercises/log
// @access 	Private

export const updateExerciseLog = asyncHandler(async (req, res) => {
	const { logId, timeIndex, key, value } = req.body

	const currentLog = await ExerciseLog.findById(logId)

	if (!currentLog) {
		res.status(404)
		throw new Error('This log was not found!')
	}

	let newTimes = currentLog.times

	if (!timeIndex || !key || !value) {
		res.status(404)
		throw new Error('You have not specified all the fields!')
	}

	newTimes[timeIndex][key] = value

	currentLog.times = newTimes

	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})

// @desc 		Update status of complete exercise log
// @route 	PUT /api/exercises/log/complete
// @access 	Private

export const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
	const { logId, completed } = req.body

	const currentLog = await ExerciseLog.findById(logId)

	if (!currentLog) {
		res.status(404)
		throw new Error('This log was not found!')
	}

	currentLog.completed = completed

	const updatedLog = await currentLog.save()

	res.json(updatedLog)
})