import {useEffect, useState} from 'react'
import { DogAPI_RandomImageResponse } from '../types'
import axios from 'axios'

const useGetData = (initialUrl: string|null = null) => {
	const [data, setData] = useState<DogAPI_RandomImageResponse|null>(null)
	const [url, setUrl] = useState<string|null>(initialUrl)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string|null>(null)
	const newKey = Math.random().toString(36).substring(7)

	const getData = async (resourceUrl: string) => {
		setIsLoading(true)
		setData(null)
		setError(null)
		try {
			const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)

			setData(res.data)
			
		} catch(err: any) {
			setError(`Could not fetch data: ${err.message}`)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		if (!url) {
			return
		}
		
		getData(url)
	}, [url])


	return {
		data,
		setUrl,
		newKey,
		isLoading,
		error
	}
}

export default useGetData