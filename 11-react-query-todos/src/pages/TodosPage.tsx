import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewTodo, Todos } from '../types/TodosAPI.types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import AddNewTodoForm from '../components/AddNewTodoForm'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import useTodos from '../hooks/useTodos'
import * as TodosAPI from '../services/TodosAPI'

const TodosPage = () => {
	const location = useLocation()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const deletedTodo = location.state?.deleted ?? false
	const queryClient = useQueryClient()

	const {
		data: todos,
		isError,
	} = useTodos<Todos>()

	const createTodoMutation = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: (newTodo) => {
			// instead of invalidating the ["todos"] query, we can construct
			// new data based on the old data and the response from the create
			// Todo request.
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return [
					...prevTodos ?? [],
					newTodo,
				]
			})

			// also insert the new todo into the query cache
			queryClient.setQueryData(["todo", { id: newTodo.id }], newTodo)
		}
	})

	// // sort alphabetically by title
	// data.sort((a, b) => a.title.localeCompare(b.title))

	// // sort by completed status
	// data.sort((a, b) => Number(a.completed) - Number(b.completed))

	// Create a new todo in the API
	const addTodo = (todo: NewTodo) => {
		createTodoMutation.mutate(todo)
	}

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			{deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)}

			{isError && (
				<Alert variant="danger">
					An terrible, inexplicable error occurred while fetching todos. It wasn't me!
				</Alert>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
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
