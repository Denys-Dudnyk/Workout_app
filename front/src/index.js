import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'

import Routers from './Routers'
import reportWebVitals from './reportWebVitals'
//import { Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Routers />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
)

reportWebVitals()
