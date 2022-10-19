import { useEffect, useState } from 'react'
import Header from '../../common/Header/Header'
import Alert from '../../ui/Alert/Alert'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'

import styles from './Exercises.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import bgImage1 from '../../../images/exercise1.jpg'
import bgImage2 from '../../../images/exercise2.jpg'
import checkCompletedImage from '../../../images/exercises/check_complete.svg'
import checkImage from '../../../images/exercises/check.svg'

import cn from 'classnames'
import debounce from 'lodash.debounce'
import Loader from '../../ui/Loader'

const getRandomImage = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const SingleExercises = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [bgImage, setBgImage] = useState(bgImage1)

	useEffect(() => {
		setBgImage(getRandomImage(1, 2) === 1 ? bgImage1 : bgImage2)
	}, [])

	const { data, isSuccess, refetch, isLoading } = useQuery(
		['Get Exercise Log'],
		() =>
			$api({
				url: `/exercises/log/${id}`,
			})
	)

	const { mutate: changeState, error: errorChange } = useMutation(
		['Change log state'],
		({ timeIndex, key, value }) =>
			$api({
				url: '/exercises/log',
				type: 'PUT',
				body: { timeIndex, key, value, logId: id },
			}),
		{
			onSuccess() {
				refetch()
			},
		}
	)

	const { mutate: setExCompleted, error: errorCompleted } = useMutation(
		['Change log state'],
		() =>
			$api({
				url: '/exercises/log/completed',
				type: 'PUT',
				body: { logId: id, completed: true },
			}),
		{
			onSuccess() {
				navigate(`/workout/${data.workoutLog}`)
			},
		}
	)

	useEffect(() => {
		if (
			isSuccess &&
			data.times.length === data.times.filter(time => time.completed).length &&
			data._id === id
		) {
			setExCompleted()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.times, isSuccess])

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{
					backgroundImage: `url(${bgImage})`,
					height: 345,
				}}
			>
				<Header
					backLink={isSuccess ? `/workout/${data.workoutLog}` : '/workouts'}
				/>

				{isSuccess && (
					<div className={styles.heading}>
						<img
							src={`/uploads/exercises/${data.exercise.imageName}.svg`}
							height='34'
							alt=''
							draggable={false}
						/>
						<h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
					</div>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				<div style={{ width: '90%', margin: '0 auto' }}>
					{errorChange && <Alert type='error' text={errorChange} />}
					{errorCompleted && <Alert type='error' text={errorCompleted} />}
				</div>
				{isLoading || (isSuccess && data._id !== id) ? (
					<Loader />
				) : (
					<div className={styles.wrapper}>
						<div className={styles.row}>
							<div>
								<span>Previous</span>
							</div>

							<div>
								<span>Repeat & Weight</span>
							</div>

							<div>
								<span>Complete</span>
							</div>
						</div>
						{data.times.map((item, idx) => (
							<div
								className={cn(styles.row, {
									[styles.completed]: item.completed,
								})}
								key={`time ${idx}`}
							>
								<div
									className={styles.opacity}
									key={`Prev ${idx}/${item.prevWeight}`}
								>
									<input
										type='number'
										defaultValue={item.prevWeight}
										disabled
									/>
									<i>kg{item.completed ? '' : ' '}/</i>
									<input
										type='number'
										defaultValue={item.prevRepeat}
										disabled
									/>
								</div>

								<div key={`RepeatWeight ${idx}/${item.weight}`}>
									<input
										type='tel'
										pattern='[0-9]*'
										defaultValue={item.weight}
										onChange={debounce(
											e =>
												e.target.value &&
												changeState({
													timeIndex: idx,
													key: 'weight',
													value: e.target.value,
												}),
											1000
										)}
									/>
									<i>kg{item.completed ? '' : ' '}/</i>
									<input
										type='number'
										defaultValue={item.repeat}
										onChange={debounce(
											e =>
												e.target.value &&
												changeState({
													timeIndex: idx,
													key: 'repeat',
													value: e.target.value,
												}),
											1000
										)}
										disabled={item.completed}
									/>
								</div>

								<div key={`Completed ${idx}/${item.completed}`}>
									<img
										src={item.completed ? checkCompletedImage : checkImage}
										className={styles.checkbox}
										alt=''
										onClick={() =>
											changeState({
												timeIndex: idx,
												key: 'completed',
												value: !item.completed,
											})
										}
									/>
								</div>
							</div>
						))}
					</div>
				)}
				{isSuccess && data?.times?.length === 0 && (
					<Alert type='warning' text='Times not found' />
				)}
			</div>
		</>
	)
}

export default SingleExercises
