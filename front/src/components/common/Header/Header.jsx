import React from 'react'
import Hamburger from './Hamburger/Hamburger'

import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({ backCallback }) => {
	//const history = useNavigate()
	//const { location } = history
	const auth = true

	return (
		<header className={styles.header}>
			{auth.path !== '/' ? (
				<button type='button' onClick={backCallback}>
					<img src={arrowImage} alt='Auth' />
				</button>
			) : (
				<button type='button'>
					<img src={userImage} alt='Auth' />
				</button>
			)}

			<Hamburger />
		</header>
	)
}

export default Header
