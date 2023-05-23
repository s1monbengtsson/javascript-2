import { useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {
	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather|null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const handleSearch = async (location: string) => {
		setIsLoading(true)
		setError(false)
		console.log("error:", error)
		try {
			const data = await getCurrentWeather(location)
			setCurrentWeather(data)
			setIsLoading(false)
		} catch (err: any) {
			console.log("error", err.message)
			setIsLoading(false)
			setError(true)
		}
	}


	return (
		<div id="app" className="container">
			<SearchCity 
				onSearch={handleSearch}
			/>

			{isLoading && (
				<img src={Airplane} />
			)}

			{error && (
				<div className="alert alert-danger">Could not find city</div>
			)}

			{currentWeather && !error && !isLoading && (
				<Forecast 
					data={currentWeather}
				/>
			)}
		</div>
	)
}

export default App
