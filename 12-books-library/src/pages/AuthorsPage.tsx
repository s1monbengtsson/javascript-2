import { createColumnHelper } from '@tanstack/react-table'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import WarningAlert from '../components/alerts/WarningAlert'
import TanstackSortableTable from '../components/TanstackSortableTable'
import useAuthors from '../hooks/useAuthors'
import { Author } from '../types/BooksAPI.types'
import CreateAuthorForm from '../components/forms/CreateAuthorForm'

/*
const columns: ColumnDef<Author>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'date_of_birth',
		header: 'Date of birth',
	},
]
*/

const columnHelper = createColumnHelper<Author>()

const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
	}),
	columnHelper.group({
		header: 'Author Details',
		columns: [
			columnHelper.accessor('name', {
				header: 'Name',
				cell: props => (
					<Link to={`/authors/${props.row.original.id}`}>
						{props.getValue()}
					</Link>
				)
			}),
			columnHelper.accessor('date_of_birth', {
				header: 'Date of birth',
			}),
		],
	}),
	columnHelper.display({
		id: 'actions',
		cell: props => (
			<div className="flex justify-end">
				<Link className="btn btn-primary btn-sm" to={`/authors/${props.row.original.id}`}>View</Link>
			</div>
		),
	})
]

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

			{authors && <TanstackSortableTable columns={columns} data={authors} />}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>
					<CreateAuthorForm />
				</Card.Body>
			</Card>
		</>
	)
}

export default AuthorsPage
