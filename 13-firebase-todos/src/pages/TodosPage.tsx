import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo, Todo, Todos } from "../types/Todo.types"
import { db } from '../servies/firebase'
import Button from 'react-bootstrap/Button'


const TodosPage = () => {
	const [todos, setTodos] = useState<Todos|null>(null)
	const [loading, setLoading] = useState(false)


	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		// 👻
		console.log("Would add a new todo:", todo)
	}

	const getTodos = async () => {
		setLoading(true)
		// get reference to collection todos
		const colRef = collection(db, "todos")

		// get query snapshot of collection
		const snapshot = await getDocs(colRef)

		// loop over all docs
		const data = snapshot.docs.map(doc => {
			return {
				_id: doc.id,
				...doc.data()
			} as Todo
		})

		setTodos(data)
		setLoading(false)
	}

	// Get todos on component mount
	useEffect(() => {
		getTodos()
	}, [])

	return (
		<>

			<div className="d-flex justify-content-between">
				<h1 className="mb-3">Todos</h1>
				<div className='d-flex align-items-center'>
					<Button variant='primary'>Refresh</Button>
				</div>
			</div>

			<AddNewTodoForm onAddTodo={addTodo} />

			{loading && <p>Loading todos...</p>}


			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map((todo) => (
						<ListGroup.Item
							action
							as={Link}
							key={todo._id}
							className={todo.completed ? "done" : ""}
							to={`/todos/${todo._id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
