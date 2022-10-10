import { Fragment } from 'react'
import Header from '../../common/Header/Header'

import bgImage from '../../../images/workout_bg.jpg'
import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import { useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'

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
										{/* <Link to={`exercises/${ex._id}`}> */}
										<span onClick={() => navigate(`exercises/${ex._id}`)}>
											{ex.name}
										</span>
										<img
											src={`/uploads/exercises/${ex.imageName}.svg`}
											height='34'
											alt=''
											draggable={false}
										/>
										{/* </Link> */}
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
