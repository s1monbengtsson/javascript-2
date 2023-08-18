import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types/Todo.types'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import ConfirmationModal from '../components/ConfirmationModal'
import { useQuery } from '@tanstack/react-query'

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { id } = useParams()
    const todoId = Number(id)
	const navigate = useNavigate()

	const { data, error } = useQuery({
		queryKey: ['todo', { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
		enabled: !!todoId
	})

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		TodosAPI.getTodos()
	}

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


	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// navigate user to '/todos'
		navigate('/todos', { 
			replace: true,
			state: {
				message: `"${todo.title}" was successfully deleted`
			}
		})
	}
	

	if (error) {
		navigate(`/todos`, {
			replace: true,
		})

		return (	
			<Alert variant='warning'>
				<h1>Something went wrong!</h1>
				<p>{JSON.stringify(error)}</p>
			</Alert>	
		)
	}

  	return (
		<>
			{data && (
				<>
					<h1>{data.title}</h1>

					<p><strong>Status:</strong> { data.completed ? 'Completed' : 'Not completed'}</p>

					<div className="buttons mb-3">
						<Button variant="success" onClick={() => toggleTodo(data)}>Toggle</Button>
						<Link to={`/todos/${data.id}/edit`}>
							<Button variant="warning" onClick={() => editTodo(data)}>Edit</Button>
						</Link>
						<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
					</div>

					<ConfirmationModal
						show={showConfirmDelete}
						onCancel={() => setShowConfirmDelete(false)}
						onConfirm={() => deleteTodo(data)}
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