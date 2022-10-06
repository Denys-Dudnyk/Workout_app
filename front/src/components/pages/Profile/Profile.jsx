import Header from '../../common/Header/Header'
import Counters from '../../ui/Counters/Counters'

import bgImage from '../../../images/profile-bg.jpg'
import afterImage from '../../../images/after.jpg'
import beforeImage from '../../../images/before.jpg'
import userImage from '../../../images/header/user.svg'
import styles from './Profile.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import { useQuery } from '@tanstack/react-query'
import { $api } from '../../../api/api'

const Profile = () => {
	const { data, isSuccess } = useQuery(
		['home page counter'],
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)
	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				<Header />
				<div className={styles.center}>
					<img src={userImage} alt='Profile' height='56' />
					<div>
						{isSuccess && (
							<h1 className={stylesLayout.heading}>{data.email}</h1>
						)}
					</div>
				</div>
				{isSuccess && (
					<Counters
						minutes={data.minutes}
						workouts={data.workouts}
						kgs={data.kgs}
						type='profile'
					/>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				<div className={styles.before_after}>
					<div>
						<div className={styles.heading}>Before</div>
						<img src={beforeImage} alt='Before' />
					</div>
					<div>
						<div className={styles.heading}>After</div>
						<img src={afterImage} alt='After' />
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
