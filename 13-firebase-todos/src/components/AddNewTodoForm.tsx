import React from 'react'
import { NewTodo } from '../types/Todo.types'
import { useForm } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

type Props = {
	onAddTodo: (todo: any) => void
}

const AddNewTodoForm: React.FC<Props> = ({ onAddTodo }) => {

	const { handleSubmit, register, reset, formState: { errors } } = useForm<NewTodo>()

	const onSubmit = async (data: NewTodo) => {
		console.log("Submitted data:", data)

		// creates a the new todo, which is 
		//then sent as a param for `onAddTodo`
		const newTodo = {
			title: data.title,
			completed: false
		}

		onAddTodo(newTodo)

		// resets the form after submit
		reset()
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>New Todo Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="LeArN tO cOdE"
					{...register('title', {
						required: true,
						minLength: 3,
					})}
				/>
				{errors.title && <p className="text-danger">Y U ENTER TOO SHORT TITLE?!</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
				>Create</Button>
			</div>
		</Form>
	)
}

export default AddNewTodoForm
