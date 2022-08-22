import React from 'react'
import Layout from '../../common/Layout'
import { useNavigate } from 'react-router-dom'

import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import styles from './NewWorkout.module.scss'

const NewWorkout = () => {
	const navigate = useNavigate()
	const [name, setName] = React.useState('')
	//const [exercises, setExercises] = React.useState([])

	const handleSubmit = () => {
		console.log('submit')
	}

	return (
		<>
			<Layout bgImage={bgImage} />
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					{/* React Select */}
					<Button text='Create' callback={() => navigate('/')} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
