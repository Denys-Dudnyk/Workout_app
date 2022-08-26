import React from 'react'
import Hamburger from './Hamburger/Hamburger'

import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'

import '../../pages/NewWorkout/NewWorkout'

const Header = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	return (
		<header className={styles.header}>
			{pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img src={arrowImage} alt='Back' />
				</button>
			) : (
				<button type='button' onClick={() => navigate('/auth')}>
					<img src={userImage} alt='Auth' />
				</button>
			)}

			<Hamburger />
		</header>
	)
}

export default Header
