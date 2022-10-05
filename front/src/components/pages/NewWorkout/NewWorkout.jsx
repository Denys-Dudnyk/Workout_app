import React from 'react'
import Select from 'react-select'
//import makeAnimated from 'react-select/animated'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'

import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

//const animatedComponents = makeAnimated()

const NewWorkout = () => {
	//const navigate = useNavigate()
	const [name, setName] = React.useState('')
	const [exercisesCurrent, setExercisesCurrent] = React.useState([])

	const { data, isSuccess } = useQuery(
		['List exercises'],
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		isSuccess: isSuccesMutate,
		isLoading,
		error,
	} = useMutation(
		['Create new Workout'],
		({ exIds }) =>
			$api({
				url: '/workouts',
				type: 'POST',
				body: { name, exerciseIds: exIds },
			}),
		{
			onSuccess() {
				setName('')
				setExercisesCurrent('')
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()

		const exIds = exercisesCurrent.map(ex => ex.value)

		mutate({
			exIds,
		})
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccesMutate && <Alert text='Workout created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						placeholder='Enter name'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add new exercise
					</Link>
					{isSuccess && data && (
						<Select
							//components={animatedComponents}
							classNamePrefix='select2-selection'
							closeMenuOnSelect={false}
							placeholder='Exercises...'
							title='Exercises'
							isMulti
							options={data.map(ex => ({
								value: ex._id,
								label: ex.name,
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent}
						/>
					)}
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
