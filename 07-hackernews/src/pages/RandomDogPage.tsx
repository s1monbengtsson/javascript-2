import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import useGetData from '../hooks/useGetData'
import Alert from 'react-bootstrap/Alert'


const RandomDogPage = () => {
	const { data, setUrl, newKey, isLoading, error } = useGetData("https://dog.ceo/api/breeds/image/random")
	
	return (
		<>
			<h1>A random doggo 🐶</h1>

			<div>
				<Button variant='primary' className="mx-2" onClick={() => setUrl(`https://dog.ceo/api/breeds/image/random?key=${newKey}`)}>Random Doggo</Button>
				<Button variant='primary' className="mx-2" onClick={() => setUrl(`https://dog.ceo/api/breed/chihuahua/images/random?key=${newKey}`)}>Random Chihuahua Doggo</Button>
			</div>

			{isLoading && <p>Loading...</p>}

			{error && <Alert variant='warning'>{error}</Alert>}

			{!error && (
				<div>
					{!isLoading && data && data.status === "success" && (
						<Image src={data.message} className="img-fluid"></Image>
					)}
				</div>
			)}
			
		</>
	)
}

export default RandomDogPage