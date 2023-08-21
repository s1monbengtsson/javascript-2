import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { Todo } from '../types/Todo.types'
import Alert from 'react-bootstrap/Alert'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TodosPage from './TodosPage'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const createTodoMutation = useMutation({
		mutationKey: ['todos'],
		mutationFn: (todo: Todo) => {
		  return TodosAPI.createTodo(todo)
		},
		onSuccess() {
			queryClient.invalidateQueries(["todos"], { exact: true })
			setTimeout(() => {
				navigate('/todos')
			}, 1000)
		},
	  })


	// Create a new todo in the API
	// const addTodo = async (todo: Todo) => {
	// 	try {
	// 		const createdTodo = await TodosAPI.createTodo(todo)
			
	// 		setSuccess(!!createdTodo)

			
	// 		setTimeout(() => {
	// 			navigate("/todos")
	// 		}, 1500)


	// 	} catch (err: any) {
	// 		setSuccess(false)
	// 	}
	// }

	
  return (
    <>
		<h1 className="mb-3">Create a new todo</h1>

		<AddNewTodoForm onAddTodo={createTodoMutation.mutate} />
		
		{createTodoMutation.isSuccess && <Alert variant="success" className="mt-3">Created Todo: {createTodoMutation.data.title}</Alert>}

		{createTodoMutation.isError && <Alert variant="warning" className="mt-3">Could not create Todo</Alert>}

	</>
  )
}


export default CreateTodoPage