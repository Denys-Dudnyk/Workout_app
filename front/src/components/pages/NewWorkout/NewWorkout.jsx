import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'

import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import styles from './NewWorkout.module.scss'
//import { optionColor } from './optionColor'

const animatedComponents = makeAnimated()

const NewWorkout = () => {
	//const navigate = useNavigate()
	const [name, setName] = React.useState('')
	const [exercises, setExercises] = React.useState([])

	const handleSubmit = () => {
		console.log('submit')
	}

	const options = [
		{ value: 0, label: 'Push-ups' },
		{ value: 1, label: 'Pull-ups' },
		{ value: 2, label: 'Puls-ups' },
	]

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className='wrapper-inner-page'>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add new exercise
					</Link>
					<Select
						//components={animatedComponents}
						classNamePrefix='select2-selection'
						closeMenuOnSelect={false}
						placeholder='Exercises...'
						title='Exercises'
						isMulti
						options={options}
						value={exercises}
						onChange={setExercises}
					/>

					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
