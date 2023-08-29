import React from 'react'
import { Author } from '../types/BooksAPI.types'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

type IProps = {
    authors: Author[]
}

const AuthorsTable: React.FC<IProps> = ({ authors }) => {
    return (
        <Table responsive striped bordered>
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Author Birthdate</th>
                </tr>
            </thead>

            <tbody>
                {authors.map(author => (
                    <tr key={author.id}>
                        <td><Link to={`/authors/${author.id}`} style={{textDecoration: 'none'}}>{author.name}</Link></td>
                        <td>{author.date_of_birth}</td>
                    </tr>
                ))}
            </tbody>


        </Table>
    )
}

export default AuthorsTable