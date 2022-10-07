import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'

import reportWebVitals from './reportWebVitals'
//import { Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppProvider from './providers/AppProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppProvider />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
)

reportWebVitals()
