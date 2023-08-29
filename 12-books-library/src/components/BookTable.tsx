import React from 'react'
import { Book } from '../types/BooksAPI.types'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

type IProps = {
    books: Book[]
}

const BookTable: React.FC<IProps> = ({ books }) => {

    if (!books.length) {
        return <p>No books for you!</p>
    }

    return (
        <Table responsive striped bordered>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Author Birthdate</th>
                    <th>Pages</th>
                    <th>Published</th>
                </tr>
            </thead>

            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td><Link to={`/authors/${book.author.id}`} style={{textDecoration: 'none'}}>{book.author.name}</Link></td>
                        <td>{book.author.date_of_birth}</td>
                        <td>{book.pages}</td>
                        <td>{book.published}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default BookTable