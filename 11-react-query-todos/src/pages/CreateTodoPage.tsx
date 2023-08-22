import { useNavigate} from 'react-router-dom'
import { NewTodo } from '../types/Todo.types'
import Alert from 'react-bootstrap/Alert'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { data: oldData } = useQuery({
		queryKey: ['todos'],
		queryFn: TodosAPI.getTodos
	})

	const createTodoMutation = useMutation({
		mutationKey: ['todos'],
		mutationFn: TodosAPI.createTodo,
		
		onSuccess(data) {
			queryClient.setQueryData(["todos"], oldData ? [...oldData, data] : [data])
			setTimeout(() => {
				navigate('/todos')
			}, 2000)
		},
	})

	const addTodo = async (todo: NewTodo) => {
		await createTodoMutation.mutateAsync(todo)
	}
	
	return (
		<>
			<h1 className="mb-3">Create a new todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />
			
			{createTodoMutation.isSuccess && <Alert variant="success" className="mt-3">Created Todo: {createTodoMutation.data.title}</Alert>}

			{createTodoMutation.isError && <Alert variant="warning" className="mt-3">Could not create Todo</Alert>}

		</>
	)
}

export default CreateTodoPage