import Header from '../../common/Header/Header'
import Alert from '../../ui/Alert/Alert'
import { Fragment, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import bgImage from '../../../images/workout_bg.jpg'
import cn from 'classnames'
import Loader from '../../ui/Loader'

const SingleWorkout = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data, isSuccess, isLoading } = useQuery(
		['Get Workout'],
		() =>
			$api({
				url: `/workouts/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { mutate: setWorkoutCompleted, error: errorCompleted } = useMutation(
		['Change log state'],
		() =>
			$api({
				url: '/workouts/log/completed',
				type: 'PUT',
				body: { logId: id },
			}),
		{
			onSuccess() {
				navigate('/workouts')
			},
		}
	)

	useEffect(() => {
		if (
			isSuccess &&
			data?.exerciseLogs &&
			data.exerciseLogs.length ===
				data.exerciseLogs.filter(log => log.completed).length &&
			data._id === id
		) {
			setWorkoutCompleted()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.exerciseLogs])

	// const {
	// 	mutate,
	// 	isSuccess: isSuccesMutate,
	// 	isLoading,
	// 	error,
	// } = useMutation(
	// 	['Create new exercise log'],
	// 	({ exId, times }) =>
	// 		$api({
	// 			url: '/exercises/log',
	// 			type: 'POST',
	// 			body: { exerciseId: exId, times },
	// 		}),
	// 	{
	// 		onSuccess(data) {
	// 			navigate(`/exercise/${data._id}`)
	// 		},
	// 	}
	// )

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{ backgroundImage: `url(${bgImage})`, height: 345 }}
			>
				<Header />

				{isSuccess && (
					<div>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={stylesLayout.heading}>{data.workout.name}</h1>
					</div>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				<div style={{ width: '90%', margin: '0 auto' }}>
					{errorCompleted && <Alert type='error' text={errorCompleted} />}
				</div>
				{isLoading || (isSuccess && data._id !== id) ? (
					<Loader />
				) : (
					<div className={styles.wrapper}>
						{data.exerciseLogs.map((exLog, idx) => {
							return (
								<Fragment key={`ex log ${idx}`}>
									<div
										className={cn(styles.item, {
											[styles.completed]: exLog.completed,
										})}
									>
										<button
											aria-label='Move to exercise'
											onClick={() => navigate(`/exercise/${exLog._id}`)}
										>
											<span>{exLog.exercise.name}</span>
											<img
												src={`/uploads/exercises/${exLog.exercise.imageName}.svg`}
												height='34'
												alt=''
												draggable={false}
											/>
										</button>
									</div>
									{idx % 2 !== 0 && idx !== data.exerciseLogs.length - 1 && (
										<div className={styles.line}></div>
									)}
								</Fragment>
							)
						})}
					</div>
				)}
				{isSuccess && data?.length === 0 && (
					<Alert type='warning' text='Exercises not found' />
				)}
			</div>
		</>
	)
}

export default SingleWorkout
