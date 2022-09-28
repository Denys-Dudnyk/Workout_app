import React from 'react'
import Hamburger from './Hamburger/Hamburger'

import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import authImage from '../../../images/header/dumbbell.svg'
import arrowImage from '../../../images/header/arrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'

import '../../pages/NewWorkout/NewWorkout'
import { useAuth } from '../../../hooks/useAuth'

const Header = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			{pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img src={arrowImage} alt='Back' />
				</button>
			) : (
				<button
					type='button'
					onClick={() => navigate(isAuth ? '/profile' : '/auth')}
				>
					<img src={isAuth ? authImage : userImage} alt='Auth' height='40' />
				</button>
			)}

			<Hamburger />
		</header>
	)
}

export default Header
