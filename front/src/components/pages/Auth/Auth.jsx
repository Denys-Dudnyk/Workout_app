import React from 'react'

import Layout from '../../common/Layout'

import bgImage from '../../../images/bg-auth.png'
import Field from '../../ui/Field/Field'
import Button from '../../ui/Button/Button'

import styles from './Auth.module.scss'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'
import { useMutation } from '@tanstack/react-query'
import { $api } from '../../../api/api'

const Auth = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [type, setType] = React.useState('auth')

	const {
		mutate: register,
		isLoading,
		error,
	} = useMutation('Registration', () =>
		$api({
			url: '/users/profile',
			type: 'GET',
			body: { email, password },
			auth: false,
		})
	)

	const handleSubmit = e => {
		e.preventDefault()
		if (type === 'auth') {
			console.log('Auth')
		} else {
			register()
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Auth || Register' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Field
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={({ target: { value } }) => setPassword(value)}
					/>
					<div className={styles.wrapperButton}>
						<Button text='Sign in' callback={() => setType('auth')} />
						<Button text='Sign up' callback={() => setType('reg')} />
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
