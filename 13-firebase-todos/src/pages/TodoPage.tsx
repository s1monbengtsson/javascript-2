import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify'
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { todosCol } from '../services/firebase'
import { TodoFormData } from '../types/Todo.types'
import { Alert, Container } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()

	const { currentUser } = useAuth()

	const documentId = id as string

	const {
		data: todo,
		loading
	} = useGetTodo(documentId)

	const toggleTodo = async (data: TodoFormData) => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Set the contents of the document
		toast.promise(updateDoc(docRef, {
			completed: !data.completed
		}), {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo was saved successfully",
			error: "😬 Unable to save todo"
		})
	}

	const deleteTodo = async () => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Delete the document
		await deleteDoc(docRef)

		// 🥂
		toast.success("💣 Todo deleted")

		// Redirect user to todos list
		// (and replace the current history entry for this page)
		navigate('/todos', {
			replace: true,
		})
	}
	
	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	if (todo.uid !== currentUser?.uid) {
		return <Alert variant='danger' className='text-center'>You do not own the rights for this todo!</Alert>
	}
	
		const createdAtTimestamp = (todo.created_at.seconds+todo.created_at.nanoseconds*10**-9)*1000
		const createdAt = new Date(createdAtTimestamp).toLocaleString()

		const updatedAtTimestamp = (todo.updated_at.seconds+todo.updated_at.nanoseconds*10**-9)*1000
		const updatedAt = new Date(updatedAtTimestamp).toLocaleString()

	return (
		<Container className='mt-3'>
			<div className="d-flex justify-content-between align-items-start">
				<h1>{todo.title}</h1>
			</div>

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? "Completed" : "Not completed"}
			</p>

			<p className='mb-0'>
				<strong>Created At:</strong>{" "}
				{createdAt}
			</p>

			<p>
				<strong>Updated At:</strong>{" "}
				{updatedAt}
			</p>

			<div className="buttons mb-3">
				<Button
					variant="success"
					onClick={() => toggleTodo(todo)}
				>
					Toggle
				</Button>

				<Link to={`/todos/${id}/edit`}>
					<Button variant="warning">Edit</Button>
				</Link>

				<Button
					variant="danger"
					onClick={() => setShowConfirmDelete(true)}
				>
					Delete
				</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={deleteTodo}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</Container>
	)
}

export default TodoPage
