import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		name: String,
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},

		images: {
			before: String,
			after: String,
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

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(100)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
