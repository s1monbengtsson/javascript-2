import './assets/scss/App.scss'
import Container from 'react-bootstrap/Container'
import Navigation from './partials/Navigation'

const App = () => {

	return (
		<div id="App">
			<Navigation />
			<Container>
				<h1>I ❤️ React Query </h1>
			</Container>
		</div>
		
	)
}

export default App
