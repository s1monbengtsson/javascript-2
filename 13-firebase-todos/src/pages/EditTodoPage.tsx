import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useGetTodo from '../hooks/useGetTodo'
import { todosCol } from '../services/firebase'
import TodoForm from '../components/TodoForm'
import { TodoFormData } from '../types/Todo.types'
import { Alert, Container } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'

const EditTodoPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const documentId = id as string
	const { currentUser } = useAuth()

	const {
		data: todo,
		loading
	} = useGetTodo(documentId)

	if (loading || !todo) {
		return <p>Loading todo...</p>
	}

	const updateTodo = async (data: TodoFormData) => {
		// Get a reference to the document
		const docRef = doc(todosCol, documentId)

		// Set the contents of the document
		toast.promise(updateDoc(docRef, {
			...data,
			updated_at: serverTimestamp(),
		}), {
			pending: "🤔 Saving todo...",
			success: "🤩 Todo was saved successfully",
			error: "😬 Unable to save todo"
		})
	}

	if (todo.uid !== currentUser?.uid) {
		return <Alert variant='danger' className='text-center'>You do not own the rights for this todo!</Alert>
	}

	return (
		<Container className='mt-3'>
			<h1>Edit: {todo.title}</h1>

			<TodoForm onSave={updateTodo} initialValues={todo} />

			<Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
		</Container>
	)
}

export default EditTodoPage
