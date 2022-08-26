import React from 'react'
import styles from './Field.module.scss'

const Field = ({ placeholder, value, onChange, type = 'text' }) => {
	return (
		<input
			placeholder={placeholder}
			type={type}
			value={value}
			onChange={onChange}
			className={styles.input}
			required
		/>
	)
}

export default Field
