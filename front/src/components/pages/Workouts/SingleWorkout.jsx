import Header from '../../common/Header/Header'
import Alert from '../../ui/Alert/Alert'
import { Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import bgImage from '../../../images/workout_bg.jpg'
import Loader from '../../ui/Loader'

const SingleWorkout = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { data, isSuccess } = useQuery(
		['Get Workout'],
		() =>
			$api({
				url: `/workouts/${id}`,
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
		['Create new exercise log'],
		({ exId, times }) =>
			$api({
				url: '/exercises/log',
				type: 'POST',
				body: { exerciseId: exId, times },
			}),
		{
			onSuccess(data) {
				navigate(`/exercise/${data._id}`)
			},
		}
	)

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
						<h1 className={stylesLayout.heading}>{data.name}</h1>
					</div>
				)}
			</div>
			{error && <Alert type='error' text={error} />}
			{isSuccesMutate && <Alert text='Ex log created' />}
			{isLoading && <Loader />}
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx}`}>
									<div className={styles.item}>
										<button
											aria-label='Move to exercise'
											onClick={
												() =>
													mutate({
														exId: ex._id,
														times: ex.times,
													})
												// navigate(`/exercise/${ex._id}`)
											}
										>
											<span>{ex.name}</span>
											<img
												src={`/uploads/exercises/${ex.imageName}.svg`}
												height='34'
												alt=''
												draggable={false}
											/>
										</button>
									</div>
									{idx % 2 !== 0 && <div className={styles.line}></div>}
								</Fragment>
							)
						})}
					</div>
				) : (
					<Alert type='warning' text='Exercises not found' />
				)}
			</div>
		</>
	)
}

export default SingleWorkout
