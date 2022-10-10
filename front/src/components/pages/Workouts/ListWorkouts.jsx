import bgImage from '../../../images/workout_bg.jpg'
import styles from './SingleWorkout.module.scss'

import { useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'
import { Link } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import Layout from '../../common/Layout'

const ListWorkouts = () => {
	const { data, isSuccess } = useQuery(
		['Get Workouts'],
		() =>
			$api({
				url: '/workouts',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	return (
		<>
			<Layout bgImage={bgImage} heading='Workouts' />
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.map((workout, idx) => (
							<div className={styles.item} key={`workout ${idx}`}>
								<Link to={`/workouts/${workout._id}`}>
									<span>{workout.name}</span>
								</Link>
							</div>
						))}
					</div>
				) : (
					<Alert type='warning' text='Workouts not found' />
				)}
			</div>
		</>
	)
}

export default ListWorkouts
