import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'
import { useState } from 'react'
import { db, todosCol } from '../servies/firebase'
import { useForm, SubmitHandler } from 'react-hook-form'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

type FormData = {
	title: string
}

const EditTodoPage = () => {
	const { handleSubmit, register, formState: { errors } } = useForm<FormData>()
	const navigate = useNavigate()
	const { id } = useParams()

	const documentId = id as string

	const { data: todo, loading, getData: getTodo } = useGetTodo(documentId)

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	const onFormSubmit: SubmitHandler<FormData> = async (data: FormData) => {
		if (!id) {
			return
		}

		const docRef = doc(todosCol, documentId)

		await updateDoc(docRef, data)

		toast.success("Todo was successfully updated!")

		await getTodo()

		navigate(`/todos/${documentId}`)

	}
	
	return (
		<>
			<h1>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit(onFormSubmit)} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						defaultValue={todo.title}
						type="text"
						{...register('title', {
							required: "Todo has to have a title",
							minLength: {
								value: 3,
								message: "That title is too short"
							}
						})}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
