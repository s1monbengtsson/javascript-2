import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { Book } from '../types/BooksAPI.types'

interface IProps {
	books: Book[]
}

const BSBookTableGrouped: React.FC<IProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books for you!</p>
	}

	return (
		<Table responsive striped bordered hover>
			<thead>
				<tr>
					<th colSpan={3}>Book Info</th>
					<th colSpan={2}>Author Info</th>
				</tr>
				<tr>
					<th>Title</th>
					<th>Pages</th>
					<th>Published</th>
					<th>Author</th>
					<th>Author Birthdate</th>
				</tr>
			</thead>
			<tbody>
				{books.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td className="text-end">{book.pages} pages</td>
						<td>{book.published}</td>
						<td>
							<Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
						</td>
						<td>{book.author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSBookTableGrouped
