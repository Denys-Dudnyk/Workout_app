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

const NewWorkout = () => {
	//const navigate = useNavigate()
	const animatedComponents = makeAnimated()
	const [name, setName] = React.useState('')
	const [exercises, setExercises] = React.useState([])

	const handleSubmit = () => {
		console.log('submit')
	}

	const options = [
		{ value: 1, label: 'Push-ups' },
		{ value: 2, label: 'Pull-ups' },
	]

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add new exercise
					</Link>
					{/* <Select
						classNamePrefix='select2-selection'
						closeMenuOnSelect={false}
						components={animatedComponents}
						placeholder='Exercises...'
						title='Exercises'
						isMulti
						options={options}
						value={exercises}
						onChange={setExercises}
						theme={theme => optionColor(theme)}
					/> */}
					<Select
						classNamePrefix='select2-selection'
						components={animatedComponents}
						placeholder='Exercises...'
						//title='Exercises'
						options={options}
						value={exercises}
						onChange={setExercises}
						isMulti={true}
					/>
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
