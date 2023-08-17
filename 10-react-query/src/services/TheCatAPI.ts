/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */

import axios from 'axios'
import { HN_SearchResponse, ImageSearchResponse } from '../types/TheCatAPI.types'

const FAKE_DELAY = 1500

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1/",
	timeout: 10000,
})

/**
 * Execute a GET request
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)

	// Simulate a delay
	!!FAKE_DELAY && await new Promise(r => setTimeout(r, FAKE_DELAY))

	return response.data
}

/**
 * Get a random cat image
 */
export const getRandomCatImage = async () => {
	const data = await get<ImageSearchResponse>("images/search")

	return data[0]
}

/**
 * Get random breed
 * @param {string} breed_id The breed IF to get
 */
export const getRandomCatByBreed = async (breed_id = "") => {
	const data = await get<ImageSearchResponse>("images/search?breed_ids=" + breed_id)

	return data[0]
}

export const searchHackerNews = async (query: string) => {
	return get<HN_SearchResponse>(`/search?query=${query}&tags=story`)
}
