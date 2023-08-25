import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types/TodosAPI.types'
import ConfirmationModal from '../components/ConfirmationModal'
import useTodo from '../hooks/useTodo'
import useUpdateTodo from '../hooks/useUpdateTodo'
import useDeleteTodo from '../hooks/useDeleteTodo'

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()
	const todoId = Number(id)

	const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo,
	} = useTodo(todoId, queryEnabled)

	const deleteTodoMutation = useDeleteTodo(todoId, () => setQueryEnabled(false))

	const updateTodoCompletedMutation = useUpdateTodo(todoId)

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		updateTodoCompletedMutation.mutate({completed: !todo.completed})
	}

	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>It wasn't me that did something /the server</p>

				<Button variant='primary' onClick={() => getTodo()}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}

	if (isLoading || !todo) {
		return (<p>Loading...</p>)
	}

	return (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="buttons mb-3">
				<Button
					variant='success'
					onClick={() => toggleTodo(todo)}
					disabled={updateTodoCompletedMutation.isLoading}
				>Toggle</Button>

				<Link to={`/todos/${todoId}/edit`}>
					<Button variant='warning'>Edit</Button>
				</Link>

				<Button variant='danger' onClick={() => setShowConfirmDelete(true)} disabled={deleteTodoMutation.isLoading}>Delete</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() => !deleteTodoMutation.isLoading && deleteTodoMutation.mutate()}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
