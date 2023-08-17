import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'
import { getRandomCatByBreed } from '../services/TheCatAPI'
import { Breed } from '../types/TheCatAPI.types'

const breeds: Breed[] = [
	{ id: "ragd", name: "Ragdoll"},
	{ id: "sibe", name: "Siberian"},
	{ id: "beng", name: "Bengal"}
]



const RandomCatPage = () => {
	const [selectedBreed, setSelectedBreed] = useState("")

	const  { data, error, isFetching, refetch } = useQuery({
		queryKey: ["random-cat", selectedBreed], 
		queryFn: () => getRandomCatByBreed(selectedBreed),
		// cacheTime: 7500,
	})

	if (error) {
		return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	}

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>A cats behaviour is random so here's a random cat for you! Such random, very catlike, much hairball</p>

			<div className="text-center ">
				<div className="mb-3">
					
					<ButtonGroup className="">
						<Button
							onClick={() => refetch()}
							variant="primary"
						>
							Totally Random Cat
						</Button>

						{breeds.map(breed => (
							<Button 
								key={breed.id}
								disabled={isFetching || selectedBreed === breed.id}
								variant="secondary" 
								onClick={() => setSelectedBreed(breed.id)}
								>{breed.name}
							</Button>
						))}
					</ButtonGroup>
				</div>

				{data &&  (
					<Image src={data.url} fluid />
				)}
			</div>
		</>
	)
}

export default RandomCatPage
