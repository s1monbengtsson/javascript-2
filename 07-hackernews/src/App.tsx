import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import './assets/scss/App.scss'
import HomePage from './pages/HomePage'

const App = () => {

return (
	<div id="App">
		{/* Navigation */}

		<Container className="py-3">
			<Routes>
				<Route path="/" element={<HomePage />} />
				{/* <Route path="/search" element={} /> */}
			</Routes>
		</Container>

	</div>
  )
}

export default App