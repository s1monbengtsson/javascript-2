/**
 * Open Weather Map API
 */
import axios from 'axios'
import { ICurrentWeather } from '../types'

const API_KEY = import.meta.env.VITE_APP_OWM_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

/**
 * Get current weather for a city.
 *
 * @param {string} query City to get current weather for
 */
export const getCurrentWeather = async (query: string) => {
	const response = await axios.get<ICurrentWeather>(`${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`)

	await new Promise(r => setTimeout(r, 1000))

	console.log("res:", response.data)

	return response.data
}

