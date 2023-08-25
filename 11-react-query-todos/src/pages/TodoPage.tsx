import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Todo, Todos } from '../types/TodosAPI.types'
import * as TodosAPI from '../services/TodosAPI'
import ConfirmationModal from '../components/ConfirmationModal'

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const navigate = useNavigate()
	const { id } = useParams()
	const todoId = Number(id)
	const queryClient = useQueryClient()

	const {
		data: todo,
		isError,
		isLoading,
		refetch: getTodo,
	} = useQuery(["todo", { id: todoId }], () => TodosAPI.getTodo(todoId), { enabled: queryEnabled })

	const deleteTodoMutation = useMutation({
		mutationFn: () => TodosAPI.deleteTodo(todoId),
		onSuccess: () => {
			// disable query for this specific single todo
			setQueryEnabled(false)

			// remove the query for this specific single todo
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			// queryClient.invalidateQueries({ queryKey: ["todos"] })
			// modify query cache for ["todos"] and construct a new array with
			// the deleted todo excluded
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return prevTodos?.filter(todo => todo.id !== todoId) ?? []
			})

			// Navigate user to `/todos` (with delete-status as state)
			navigate('/todos', {
				replace: true,
				state: {
					deleted: true,
				}
			})
		}
	})

	const updateTodoCompletedMutation = useMutation({
		mutationFn: (newCompleted: boolean) => TodosAPI.updateTodo(todoId, {
			completed: newCompleted,
		}),
		onSuccess: () => {
			// invalidate the query for this specific single todo
			queryClient.invalidateQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			queryClient.invalidateQueries({ queryKey: ["todos"] })
		},
	})

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		updateTodoCompletedMutation.mutate(!todo.completed)
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
