import React, { useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Routers from '../Routers'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(false)

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<Routers />
		</AuthContext.Provider>
	)
}

export default AppProvider
