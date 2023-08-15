import './assets/scss/App.scss'
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import RandomCatPage from './pages/RandomCatPage'

const App = () => {

	return (
		<div id="App">
			<Navigation />
			
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
