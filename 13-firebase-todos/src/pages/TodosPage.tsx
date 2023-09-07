import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo } from "../types/Todo.types"
import Button from 'react-bootstrap/Button'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../servies/firebase"
import useGetTodos from "../hooks/useGetTodos"


const TodosPage = () => {
	const { loading, data: todos, getData } = useGetTodos()

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {

		await addDoc(collection(db, "todos"), {
			title: todo.title,
			completed: false,
			created_at: serverTimestamp()
		})
		
		getData()
	}

	return (
		<>
			<div className="d-flex justify-content-between">
				<h1 className="mb-3">Todos</h1>
				<div className='d-flex align-items-center'>
					<Button 
						variant='primary'
						onClick={getData}
					>Refresh</Button>
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
