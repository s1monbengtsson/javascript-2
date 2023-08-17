import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI'
import { useSearchParams } from 'react-router-dom'

const Hackernews = () => {
    const [searchInput, setSearchInput] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get("query") ?? ""
    
    const { data, error, status } = useQuery({
        queryKey: ['hackernews', query],
        queryFn: () => HN_searchByDate(searchInput), 
        enabled: !!query // "" = false  !"" === true  !!"" === false
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }
        
        setSearchParams({ query: searchInput })
    }

    return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.trim().length}
					>Search</Button>
				</div>
			</Form>

			{error && <Alert variant='warning'>{JSON.stringify(error)}</Alert>}

            {query && status === "success" && <p>Showing {new Intl.NumberFormat('en-US').format(data.nbHits)} for query "{query}"</p>}

			{data && (
				<div id="search-result">
					<ListGroup className="mb-3">
						{data.hits.map(hit => (
							<ListGroup.Item
								action
								href={hit.url}
								key={hit.objectID}
							>
								<h2 className="h3">{hit.title}</h2>
								<div className="text-muted small mb-0 d-flex justify-content-between">
                                    <span>{hit.points} points by {hit.author}</span>
                                    <span>Created at {hit.created_at}</span>
								</div>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}
		</>
	)
}

export default Hackernews