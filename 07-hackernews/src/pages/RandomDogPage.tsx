import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { DogAPI_RandomImageResponse } from '../types'


const RandomDogPage = () => {
	const [data, setData] = useState<DogAPI_RandomImageResponse|null>(null)
	const [url, setUrl] = useState("")

	const getData = async (resourceUrl: string) => {
		const res = await axios.get<DogAPI_RandomImageResponse>(resourceUrl)
			setData(res.data)
	}

	useEffect(() => {
		if (!url) {
			return
		}
		getData(url)
	}, [url])


	console.log("data:", data)
	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div>
				<Button variant='primary' onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}>Random Doggo</Button>
				<Button variant='primary' onClick={() => setUrl("https://dog.ceo/api/breed/chihuahua/images/random")}>Random Boxer Doggo</Button>
			</div>

			{!data && <p>Loading...</p>}
			
			<div>
				{data && data.status === "success" && (
					<Image src={data.message} className="img-fluid"></Image>
				)}
			</div>
		</>
	)
}

export default RandomDogPage