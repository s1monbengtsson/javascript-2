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
	const [error, setError] = useState<string|false>(false)

	const handleSearch = async (location: string) => {
		setCurrentWeather(null)
		setIsLoading(true)
		setError(false)


		try {
			const data = await getCurrentWeather(location)
			setCurrentWeather(data)

		} catch (err: any) {
			setError(err.message)
		}

		setIsLoading(false)
	}

	return (
		<div id="app" className="container">
			<SearchCity 
				onSearch={handleSearch}
			/>

			{isLoading && (
				<img src={Airplane} className="w-100 img-fluid py-5" />
			)}

			{error && (
				<div className="alert alert-danger">{error}</div>
			)}

			{currentWeather && (
				<Forecast 
					data={currentWeather}
				/>
			)}
		</div>
	)
}

export default App
