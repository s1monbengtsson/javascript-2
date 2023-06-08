import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeProvider'

const HomePage = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext)

	const handleToggleTheme = () => {
		if (toggleTheme) {
			toggleTheme()
		}
	}

	return (
		<>
			<h1>Welcome to Hacker News🕵🏻‍♂️🤓👀!</h1>

			<p>Your theme is: {isDarkMode ? 'dark 🌙' : 'light ☀️'}</p>

			<Button variant='warning' onClick={handleToggleTheme}>Switch theme</Button>

			<Link to="/search">
				<Button variant="primary">Use the Search, you must!</Button>
			</Link>
		</>
	)
}

export default HomePage
