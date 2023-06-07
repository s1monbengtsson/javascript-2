import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './componentes/Navigation'
import './assets/scss/App.scss'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'

const App = () => {

return (
	<div id="App">
		<Navigation />

		<Container className="py-3">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/search" element={<SearchPage />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Container>

	</div>
  )
}

export default App