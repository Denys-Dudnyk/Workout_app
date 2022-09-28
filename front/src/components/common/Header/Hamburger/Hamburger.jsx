import React from 'react'
import { menu } from './menuBase'

import { Link } from 'react-router-dom'
import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerCloseImage from '../../../../images/header/hamburger-close.svg'

import styles from './Hamburger.module.scss'
import { useAuth } from '../../../../hooks/useAuth'
import { useOutsideAlerter } from '../../../../hooks/useOutsideAlerter'

const Hamburger = () => {
	//const [show, setShow] = React.useState(false)

	const { setIsAuth } = useAuth()
	const { ref, isComponentVisible, setIsComponentVisible } =
		useOutsideAlerter(false)

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuth(false)
		setIsComponentVisible(false)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button
				id='but'
				type='button'
				onClick={() => setIsComponentVisible(!isComponentVisible)}
			>
				<img
					src={isComponentVisible ? hamburgerCloseImage : hamburgerImage}
					alt='Menu'
					height='24'
				/>
			</button>
			<nav
				className={`${styles.menu} ${isComponentVisible ? styles.show : ''}`}
			>
				<ul>
					{menu.map((item, idx) => (
						<li key={`_menu_${idx}`}>
							<Link to={item.link}>{item.title}</Link>
						</li>
					))}

					<li>
						<button href='/' onClick={handleLogout}>
							Logout
						</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Hamburger
