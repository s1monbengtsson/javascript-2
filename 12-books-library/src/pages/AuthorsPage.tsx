import { createColumnHelper } from '@tanstack/react-table'
import WarningAlert from '../components/alerts/WarningAlert'
import PageTransition from '../components/animations/PageTransition'
import useAuthors from '../hooks/useAuthors'
import { Author } from '../types/BooksAPI.types'
import BSAuthorTable from '../components/BSAuthorTable'
import Card from 'react-bootstrap/Card'
import CreateAuthorForm from '../components/forms/CreateAuthorForm'

const columnHelper = createColumnHelper<Author>()

// const columns = [

// 	columnHelper.accessor((author) => author.id, {
// 		header: 'ID'
// 	}),
// 	columnHelper.group({
// 		header: 'Author Details',
// 		columns: [
// 			columnHelper.accessor((author) => author.name, {
// 				header: 'Name'
// 			}),
// 			columnHelper.accessor((author) => author.date_of_birth, {
// 				header: 'Date of birth'
// 			})
// 		]
// 	})
// ]

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<PageTransition page="authors-page">
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

		{authors && <BSAuthorTable authors={authors} />}
		<hr className='mb-5' />

		<Card>
			<Card.Body>
				<Card.Title>Create Author</Card.Title>
				<CreateAuthorForm />
			</Card.Body>
		</Card>

		</PageTransition>
	)
}

export default AuthorsPage
