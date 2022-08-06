import mongoose from 'mongoose'

const exerciseSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		times: {
			type: Number,
			required: true,
		},
		imageId: {
			type: Number,
			required: true,
		},

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

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
