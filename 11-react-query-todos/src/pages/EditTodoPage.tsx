import * as TodosAPI from '../services/TodosAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const EditTodoPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const todoId = Number(id)
    const [newTodoTitle, setNewTodoTitle] = useState("")

    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['todo', { id: todoId }],
        queryFn: () => TodosAPI.getTodo(todoId),
        enabled: !!todoId,
    })

    const editTodoMutation = useMutation({
        mutationKey: ['todo', todoId],
        mutationFn: (todo_id: number) => {
            return TodosAPI.updateTodo(todo_id, {
                title: newTodoTitle
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["todo", { id: todoId }])
            queryClient.invalidateQueries(["todos"])
            setTimeout(() => {
                navigate(`/todos/${todoId}`)
            }, 1000)
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
            // stop form from submitting
            e.preventDefault()

            if (!newTodoTitle) {
                return
            }

            editTodoMutation.mutateAsync(todoId)
	}

    useEffect(() => {
		if (data) {
			setNewTodoTitle(data.title)
		}
	}, [data])

  return (
    <>
        {data && (
            <>
                <h1>Edit: {data.title}</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Enter new todo title"
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                            value={newTodoTitle}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Save changes
                    </Button>
                </Form>

                {editTodoMutation.isSuccess && (
                    <Alert variant="success" className='mt-2'>Successfully updated Todo Title to: {newTodoTitle}</Alert>
                )}

                {editTodoMutation.isError && (
                    <Alert variant="danger">{JSON.stringify(editTodoMutation.error)}</Alert>
                )}

                <p><strong>Status:</strong> {data.completed ? 'Completed' : 'Not completed'}</p>

                <Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
            </>
        )}
        
    </>
  )
}

export default EditTodoPage