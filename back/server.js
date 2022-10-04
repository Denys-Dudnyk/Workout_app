import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'

/* Config */
import { connectDB } from './config/db.js'

/* Middleware */
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

/* Routes */

import userRoutes from './routes/userRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/workouts', workoutRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
