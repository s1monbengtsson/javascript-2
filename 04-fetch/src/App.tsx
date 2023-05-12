import { useEffect, useState } from 'react'
import './assets/scss/App.scss'

interface IResource {
	id: number
	title: string
}

function App() {
	const [resource, setResource] = useState('posts')
	const [data, setData] = useState<IResource[]>([])

	useEffect(() => {
		if (!resource) {
			return
		}

		// fetch resource
		const fetchData = async () => {

			// parse response as json
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)
			const payload = await res.json() as IResource[]

			// update data state with source payload
			setData(payload)
		}
		fetchData()
	}, [resource])


	return (
		<div className="container">
			<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
			</div>

			{resource && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>
					<ol>
						{data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	)
}

export default App
