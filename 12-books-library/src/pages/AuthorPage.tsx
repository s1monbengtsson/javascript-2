import { useParams } from 'react-router-dom'
import WarningAlert from '../components/alerts/WarningAlert'
import useAuthor from '../hooks/useAuthor'
import Card from 'react-bootstrap/Card'
import CreateBookForm from '../components/forms/CreateBookForm'

const AuthorPage = () => {
	const { id } = useParams()
	const authorId = Number(id)
	const { data: author, isError, isLoading } = useAuthor(authorId)

	return (
		<>
			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading author...</p>
			)}

			{author && <>
				<h1 className="mb-3">{author.name}</h1>

				<p>Born: {author.date_of_birth}</p>

				<ul>
					{author.books.map(book => (
						<li key={book.id}>{book.title}</li>
					))}
				</ul>
			</>}

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>
					<CreateBookForm />
				</Card.Body>
			</Card>
		</>
	)
}

export default AuthorPage
