import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { Todo } from '../types/Todo.types'
import Alert from 'react-bootstrap/Alert'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
    const [success, setSuccess] = useState<boolean|null>(null)
	const navigate = useNavigate()


	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		try {
			const createdTodo = await TodosAPI.createTodo(todo)
			
			setSuccess(!!createdTodo)
			
			setTimeout(() => {
				navigate("/todos")
			}, 1500)


		} catch (err: any) {
			setSuccess(false)
		}
	}

	
  return (
    <>
		<h1 className="mb-3">Create a new todo</h1>

		<AddNewTodoForm onAddTodo={addTodo} />
		
		{success === true && (
			<Alert variant="success" className="mt-3">Todo Created</Alert>
		)}

		{success === false && (
			<Alert variant="warning" className="mt-3">Could not create Todo</Alert>
		)}

	</>
  )
}


export default CreateTodoPage