import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types/Todo.types'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import ConfirmationModal from '../components/ConfirmationModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { id } = useParams()
    const todoId = Number(id)
	const navigate = useNavigate()

	const queryClient = useQueryClient()

	const { data, error } = useQuery({
		queryKey: ['todo', { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
		enabled: !!todoId
	})

	const toggleTodoMutation = useMutation({
		mutationKey: ['todos', { id: todoId }],
		mutationFn: (todo: Todo) => {
		  return TodosAPI.updateTodo(todoId, {
			completed: !todo.completed
		  })
		},
		onSuccess() {
			queryClient.invalidateQueries(['todo', { id: todoId }])
			queryClient.invalidateQueries(['todos'])
		},
	})

	const editTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		navigate(`/todos/${todo.id}/edit`, {
			replace: true,
			state: {
				id: todo.id,
				title: todo.title
			}
		})
	}

	const deleteTodoMutation = useMutation({
		mutationKey: ['todos', { id: todoId }],
		mutationFn: () => {
		  return TodosAPI.deleteTodo(todoId)
		},
		onSuccess() {
			navigate('/todos', { 
				replace: true,
				state: {
					message: 'Todo was successfully deleted'
				}
			})
			// queryClient.invalidateQueries(['todo', { id: todoId }])
			queryClient.invalidateQueries(['todos'])
		},
	})


  	return (
		<>
			{data && (
				<>
					<h1>{data.title}</h1>

					<p><strong>Status:</strong> { data.completed ? 'Completed' : 'Not completed'}</p>

					<div className="buttons mb-3 d-flex gap-1">
						<Button variant="success" onClick={() => toggleTodoMutation.mutate(data)}>Toggle</Button>
						<Link to={`/todos/${data.id}/edit`}>
							<Button variant="warning" onClick={() => editTodo(data)}>Edit</Button>
						</Link>
						<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
					</div>

					<ConfirmationModal
						show={showConfirmDelete}
						onCancel={() => setShowConfirmDelete(false)}
						onConfirm={deleteTodoMutation.mutate}
					>
						Are you sure you want to delete this todo?
					</ConfirmationModal>
					<Link to="/todos">
							<Button variant='secondary'>&laquo; All todos</Button>
					</Link>
				</>
			)}
		</>
	)
}

export default TodoPage