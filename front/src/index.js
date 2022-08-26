import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'

import Routers from './Routers'
import reportWebVitals from './reportWebVitals'
//import { Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<Routers />
	</React.StrictMode>
)

reportWebVitals()
