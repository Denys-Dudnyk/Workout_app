import bgImage from '../../../images/workout_bg.jpg'
import styles from './ListWorkout.module.scss'

import { useMutation, useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'
import { useNavigate } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import Layout from '../../common/Layout'
import { AiFillDelete } from 'react-icons/ai'
import Loader from '../../ui/Loader'

const ListWorkouts = () => {
	const navigate = useNavigate()
	const {
		mutate,
		isSuccess: isSuccesMutate,
		isLoading: isLoadingDelete,
	} = useMutation(
		({ workId }) =>
			$api({
				url: `/workouts/${workId}`,
				type: 'DELETE',
			}),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	const handleDelete = id => {
		mutate({
			workId: id,
		})
	}

	const { data, isSuccess, refetch } = useQuery(
		['Get Workouts'],
		() =>
			$api({
				url: '/workouts',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate: createWorkoutLog,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		['Create new workout log'],
		({ workoutId }) =>
			$api({
				url: '/workouts/log',
				type: 'POST',
				body: { workoutId },
			}),
		{
			onSuccess(data) {
				navigate(`/workout/${data._id}`)
			},
		}
	)

	return (
		<>
			<Layout bgImage={bgImage} heading='Workouts' />
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{error && <Alert text={error} />}
				{isSuccessMutate && <Alert text='Workout log created' />}
				{(isLoading || isLoadingDelete) && <Loader />}
				{isSuccesMutate && <Alert text='Workout removed' />}
				{isSuccess && (
					<div className={styles.wrapper}>
						{data.map((workout, idx) => (
							<div className={styles.item} key={`workout ${idx}`}>
								<span
									onClick={() => {
										createWorkoutLog({
											workoutId: workout._id,
										})
									}}
								>
									{workout.name}
								</span>
								<AiFillDelete
									className={styles.delete}
									size='1.5em'
									title='Delete'
									onClick={() => handleDelete(workout._id)}
								/>
							</div>
						))}
					</div>
				)}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts
