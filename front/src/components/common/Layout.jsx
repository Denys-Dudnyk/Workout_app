import React from 'react'
import Header from './Header/Header'

import styles from './Layout.module.scss'

const Layout = ({ children, bgImage, height = '350px', backCallback }) => {
	return (
		<div
			className={styles.wrapper}
			style={{ height, backgroundImage: `url(${bgImage})` }}
		>
			<Header backCallback={backCallback} />
			<div>{children}</div>
		</div>
	)
}

export default Layout
