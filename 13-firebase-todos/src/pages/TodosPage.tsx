import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import TodoForm from '../components/TodoForm'
import useGetTodos from '../hooks/useGetTodos'
import { newTodosCol } from '../services/firebase'
import { TodoFormData } from "../types/Todo.types"
import { firebaseTimestamptoIsoLocal } from '../components/helpers/time'
import Container from 'react-bootstrap/Container'

const TodosPage = () => {
	const {
		data: todos,
		loading
	} = useGetTodos()

	// Create a new todo in the API
	const addTodo = async (data: TodoFormData) => {
		// Add a new document with a generated ID
		const docRef = doc(newTodosCol)

		// Set the contents of the document
		await setDoc(docRef, {
			...data,
			created_at: serverTimestamp(),
			updated_at: serverTimestamp(),
		})

		// 🥂
		toast.success("Yay, even MORE stuff to do... 😁")
	}

	return (
		<Container className='mt-3'>
			<div className="d-flex justify-content-between align-items-start">
				<h1 className="mb-3">Todos</h1>
			</div>

			<TodoForm onSave={addTodo} />

			{loading && <p>Loading todos...</p>}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done d-flex justify-content-between align-items-center" : "d-flex justify-content-between align-items-center"}
							to={`/todos/${todo._id}`}
						>
							{todo.title}
							{todo.created_at && <span className='text-muted' style={{fontSize: '13px'}}>{firebaseTimestamptoIsoLocal(todo.created_at)}</span>}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</Container>
	)
}

export default TodosPage
