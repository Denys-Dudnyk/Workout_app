import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		exercises: [
			{
				type: ObjectId,
				ref: 'Exercise',
				required: true,
			},
		],

		// statistics: {
		// 	minutes: { type: Number, default: 0 },
		// 	workouts: { type: Number, default: 0 },
		// 	kgs: { type: Number, default: 0 },
		// },
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
