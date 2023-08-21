import React, { useEffect } from 'react'
import * as TodosAPI from '../services/TodosAPI'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Todo } from '../types/Todo.types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const EditTodoPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const todoId = Number(id)
    const [todo, setTodo] = useState<Todo|null>(null)
    const [newTodoTitle, setNewTodoTitle] = useState("")

    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['todo', { id: todoId }],
        queryFn: () => TodosAPI.getTodo(todoId),
        enabled: !!todoId
    })

    const editTodoMutation = useMutation({
        mutationKey: ['todo', todoId],
        mutationFn: (todo_id: number) => {
            return TodosAPI.updateTodo(todo_id, {
                title: newTodoTitle
            })
        },
        onSuccess() {
            queryClient.invalidateQueries(["todo", { id: todoId }])
            queryClient.invalidateQueries(["todos"])
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
            // stop form from submitting
            e.preventDefault()

            if (!newTodoTitle) {
                return
            }

            await TodosAPI.updateTodo(todoId, {
                title: newTodoTitle
            })

            editTodoMutation.mutate(todoId)

            setTimeout(() => {
                navigate(`/todos/${todoId}`)
            }, 1000)
	}

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
                            placeholder="Enter the new title"
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                            value={newTodoTitle}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Save changes
                    </Button>
                </Form>

                <p><strong>Status:</strong> {data.completed ? 'Completed' : 'Not completed'}</p>

                <Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>


                {editTodoMutation.isSuccess && (
                    <Alert variant="success">Successfully updated Todo Title to: {newTodoTitle}</Alert>
                )}

                {editTodoMutation.isError && (
                    <Alert variant="danger">{JSON.stringify(editTodoMutation.error)}</Alert>
                )}
            </>
        )}
        
    </>
  )
}

export default EditTodoPage