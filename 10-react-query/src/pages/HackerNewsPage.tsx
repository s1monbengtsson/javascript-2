import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI'
import { useSearchParams } from 'react-router-dom'
import Pagination from '../components/Pagination'


const HackerNews = () => {
	const [page, setPage] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get("query") ?? ""
    
    const { data, error, status } = useQuery({
        queryKey: ['hackernews', {query, page}],
        queryFn: () => HN_searchByDate(query, page), 
        enabled: !!query, // "" = false  !"" === true  !!"" === false
		keepPreviousData: true
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!searchInput.trim().length) {
            return
        }

		setPage(0)
        
        setSearchParams({ query: searchInput }) // ?query=apple
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

					<Pagination
						page={data.page + 1}
						totalPages={data.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < data.nbPages}
						onPreviousPage={() => { setPage(prevValue => prevValue - 1), window.scrollTo({behavior: 'smooth', top: 0}) }}
						onNextPage={() => { setPage(prevValue => prevValue + 1), window.scrollTo({behavior: 'smooth', top: 0}) }}
					/>
				</div>
			)}
		</>
	)
}

export default HackerNews