import ListGroup from "react-bootstrap/ListGroup"
import { Link } from "react-router-dom"
import AddNewTodoForm from "../components/AddNewTodoForm"
import { NewTodo } from "../types/Todo.types"
import Button from 'react-bootstrap/Button'
import { addDoc, doc, setDoc } from "firebase/firestore"
import { todosCol } from "../servies/firebase"
import useGetTodos from "../hooks/useGetTodos"
import { toast } from 'react-toastify'


const TodosPage = () => {
	const { loading, data: todos, getData } = useGetTodos()

	const addTodo = async (todo: NewTodo) => {

		// adds a new doc with an auto generated ID
		const docRef = doc(todosCol)

		// sets the content of the doc
		// await setDoc(docRef, todo)

		await addDoc(todosCol, todo)

		// await addDoc(collection(db, "todos"), {
		// 	title: todo.title,
		// 	completed: false,
		// 	created_at: serverTimestamp()
		// })

		toast.success("Created new todo")
		
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
