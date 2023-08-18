import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import RandomCatPage from './pages/RandomCatPage'
import HackerNewsPage from './pages/HackerNewsPage'

import './assets/scss/App.scss'
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner'

const App = () => {
	return (
		<div id="App">
			<Navigation />
			<GlobalFetchingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />
					<Route path="/hackernews" element={<HackerNewsPage />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>

			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	)
}

export default App
