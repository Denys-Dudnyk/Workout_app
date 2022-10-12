import Header from '../../common/Header/Header'
import Alert from '../../ui/Alert/Alert'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'

import styles from './Exercises.module.scss'
import stylesLayout from '../../common/Layout.module.scss'
import bgImage1 from '../../../images/exercise1.jpg'
import bgImage2 from '../../../images/exercise2.jpg'

const getRandomImage = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const SingleExercises = () => {
	const { id } = useParams()

	const { data, isSuccess } = useQuery(
		['Get Exercise Log'],
		() =>
			$api({
				url: `/exercises/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{
					backgroundImage: `url(${
						getRandomImage(1, 2) === 1 ? bgImage1 : bgImage2
					})`,
					height: 345,
				}}
			>
				<Header />

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
				{isSuccess ? (
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
							<div className={styles.row} key={`time ${idx}`}>
								<div className={styles}>
									<input type='text' />
									<i>/</i>
								</div>
							</div>
						))}
					</div>
				) : (
					<Alert type='warning' text='Times not found' />
				)}
			</div>
		</>
	)
}

export default SingleExercises
