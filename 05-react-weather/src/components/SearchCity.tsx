import React from 'react'
import { useState } from 'react'

interface IProps {
	onSearch: (location: string) => void
}

const SearchCity: React.FC<IProps> = ({ onSearch }) => {

	const [city, setCity] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		console.log("Searched for city: ", city)
		onSearch(city)

		setCity("")
	}

	return (
		<div id="search-wrapper">
			<form 
				id="search-form"
				onSubmit={handleSubmit}
				>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={(e) => setCity(e.target.value)}
						value={city}
					/>

					<button
						disabled={city.length < 3}
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>

				{city.length < 3 && city.length !== 0 && (
					<p className="text-white mt-2">City must be at least 3 characters long</p>
				)}
			</form>
		</div>
	)
}

export default SearchCity
