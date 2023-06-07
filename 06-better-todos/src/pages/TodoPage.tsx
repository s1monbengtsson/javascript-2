import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import ConfirmationModal from '../components/ConfirmationModal'

const TodoPage = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string|null>(null)
    const [todo, setTodo] = useState<Todo|null>(null)
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const { id } = useParams()
    const todoId = Number(id)
	const navigate = useNavigate()

    // Get todo from API
    const getTodo = async (id: number) => {
		setError(null)
		setLoading(true)

		try {
			// call TodosApi
			const data = await TodosAPI.getTodo(id)

			// update todo state with data
			setTodo(data)

		} catch (err: any) {
		// set error
		setError(err.message)
    	}	

	  setLoading(false)
    }

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		setTodo(updatedTodo)
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
	

    useEffect(() => {
        if (typeof todoId !== "number") {
            return
        }

        getTodo(todoId)
    }, [todoId])

    if (loading || !todo) {
        return (<p>Loading...</p>)
    }

	if (error) {
		return (
			<Alert variant='warning'>
				<h1>Something went wrong!</h1>
				<p>{error}</p>
			</Alert>
		)
	}

  return (
    <>
        <h1>{todo.title}</h1>

        <p><strong>Status:</strong> { todo.completed ? 'Completed' : 'Not completed'}</p>

        <div className="buttons mb-3">
			<Button variant="success" onClick={() => toggleTodo(todo)}>Toggle</Button>
			<Link to={`/todos/${todo.id}/edit`}>
				<Button variant="warning" onClick={() => editTodo(todo)}>Edit</Button>
			</Link>
			<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
        </div>

		<ConfirmationModal
			show={showConfirmDelete}
			onCancel={() => setShowConfirmDelete(false)}
			onConfirm={() => deleteTodo(todo)}
		>
			Are you sure you want to delete this todo?
		</ConfirmationModal>
		

        <Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
		</Link>
    </>
  )
}

export default TodoPage