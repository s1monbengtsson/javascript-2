import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { Author } from '../types/BooksAPI.types'

interface IProps {
	authors: Author[]
}

const BSAuthorTable: React.FC<IProps> = ({ authors }) => {
	if (!authors.length) {
		return <p>No authors for you!</p>
	}

	return (
		<Table responsive striped bordered hover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Birthdate</th>
				</tr>
			</thead>
			<tbody>
				{authors.map(author => (
					<tr key={author.id}>
						<td>
							<Link to={`/authors/${author.id}`}>{author.name}</Link>
						</td>
						<td>{author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default BSAuthorTable
