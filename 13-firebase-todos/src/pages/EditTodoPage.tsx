import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import useGetTodo from '../hooks/useGetTodo'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../servies/firebase'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [newTodoTitle, setNewTodoTitle] = useState("")
	const documentId = id as string
	const { data: todo, loading, getData: getTodo } = useGetTodo(documentId)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const todoRef = doc(db, "todos", documentId)

		await updateDoc(todoRef, {
			title: newTodoTitle
		})

		getTodo()

		setNewTodoTitle("")

		navigate(`/todos/${documentId}`)

	}
	
	if (!todo) {
		return
	}
	
	return (
		<>
			<h1>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit} className='mb-4'>
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						onChange={e => setNewTodoTitle(e.target.value)}
						type="text"
						placeholder="Enter the new title"
					/>
				</Form.Group>

				<Button variant="primary" type="submit" disabled={false}>
					Save
				</Button>
			</Form>

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</>
	)
}

export default EditTodoPage
