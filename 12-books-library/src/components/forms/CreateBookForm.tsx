import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import useCreateBook from '../../hooks/useCreateBook'
import { NewBook } from '../../types/BooksAPI.types'
import { useParams } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const CreateBookForm = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>()
	const createBookMutation = useCreateBook()
    const { id } = useParams()
    const authorId = Number(id)

	const onCreateBookSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted data:", data)

		createBookMutation.mutate({
            ...data,
            authorId
        })
	}

	return (
		<Form onSubmit={handleSubmit(onCreateBookSubmit)}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Book Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="Harry Potter"
					{...register('title', {
						required: true,
						minLength: 3,
					})}
				/>
				{errors.title && <p className="text-danger">Y U ENTER TOO SHORT Title?!</p>}
			</Form.Group>

            <Form.Group className="mb-3" controlId="pages">
				<Form.Label>Pages</Form.Label>
				<Form.Control
					type="number"
					{...register('pages', {
						required: true,
                        min: 1
					})}
				/>
				{errors.pages && <p className="text-danger">Book must have at least 1 page</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="published">
				<Form.Label>Book Published Date</Form.Label>
				<Form.Control
					type="number"
					{...register('published', {
						required: true,
                        min: 1500,
                        max: currentYear
					})}
				/>
				{errors.published && <p className="text-danger">That is not a valid year</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
				>Create</Button>
			</div>
		</Form>
	)
}

export default CreateBookForm
