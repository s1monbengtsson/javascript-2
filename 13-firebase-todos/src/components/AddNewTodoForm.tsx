import React, { useEffect } from 'react'
import { NewTodo } from '../types/Todo.types'
import { useForm, SubmitHandler } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { serverTimestamp } from 'firebase/firestore'

type Props = {
	onAddTodo: (todo: any) => void
}

const AddNewTodoForm: React.FC<Props> = ({ onAddTodo }) => {

	const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm<NewTodo>()

	const onFormSubmit: SubmitHandler<NewTodo> = async (data: NewTodo) => {
		// creates a the new todo, which is 
		//then sent as a param for `onAddTodo`
		const newTodo = {
			title: data.title,
			completed: false,
			created_at: serverTimestamp()
		}

		onAddTodo(newTodo)
	}

	useEffect(() => {
		reset({
			title: '',
		})
	}, [isSubmitSuccessful])



	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className='mb-3'>

			<InputGroup>
				<Form.Control
				aria-label='The title of the new Todo'
					type="text"
					placeholder="LeArN tO cOdE"
					{...register('title', {
						required: "Can not create an empty todo",
						minLength: 3
					})}
				/>
				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
					>Create</Button>
				</div>
			</InputGroup>
			{errors.title && <p className="text-danger">Too short title...</p>}
		</Form>
	)
}

export default AddNewTodoForm
