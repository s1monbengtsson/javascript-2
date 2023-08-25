import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { NewTodo } from '../types/TodosAPI.types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const createTodoMutation = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: () => {
			// invalidate any ["todos"] queries
			queryClient.invalidateQueries({ queryKey: ["todos"] })

			setTimeout(() => {
				navigate("/todos")
			}, 2000)
		}
	})

	// Create a new todo in the API
	const addTodo = async (todo: NewTodo) => {
		await createTodoMutation.mutateAsync(todo)
	}

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{createTodoMutation.isSuccess && (
				<Alert variant="success" className="mt-3">Todo created!</Alert>
			)}

			{createTodoMutation.isError && (
				<Alert variant="warning" className="mt-3">Todo could not be created 😔</Alert>
			)}
		</>
	)
}

export default CreateTodoPage
