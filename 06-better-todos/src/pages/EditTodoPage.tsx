import React, { useEffect } from 'react'
import * as TodosAPI from '../services/TodosAPI'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Todo } from '../types'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const EditTodoPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const todoId = Number(id)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<boolean|null>(null) 
    const [error, setError] = useState<string|null>(null) 
    const [todo, setTodo] = useState<Todo|null>(null)
    const [newTodoTitle, setNewTodoTitle] = useState("")

    const getTodo = async (todoId: number) => {
        setLoading(true)

        try {
            const data = await TodosAPI.getTodo(todoId)
    
            setTodo(data)
            setNewTodoTitle(data.title)

        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }

        setLoading(false)
    }

    useEffect(() => {
        getTodo(todoId)
    }, [todoId])

    if (error) {
        return (
            <Alert>
                <h1>Something went wrong!</h1>
                <p>{error}</p>

                <Button variant="primary" onClick={() => getTodo(todoId)}>Try Again!!</Button>
            </Alert>
        )
    }

    const toggleTodo = async (todo: Todo) => {
        if (!todo.id) {
            return
        }

        const updatedTodo = await TodosAPI.updateTodo(todo.id, {
            completed: !todo.completed
        })

        setTodo(updatedTodo)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        try {
            // stop form from submitting
            e.preventDefault()

            if (!newTodoTitle) {
                return
            }

            await TodosAPI.updateTodo(todoId, {
                title: newTodoTitle
            })

            setSuccess(true)

            setTimeout(() => {
                navigate(`/todos/${todoId}`)
            }, 1000)


        } catch (err: any) {
            setError("Could not update Todo Title")
        }
	}

    if (loading || !todo) {
        return (<p>Loading...</p>)
    }

  return (
    
    <div>
        <h1>Edit: {todo.title}</h1>

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

        <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

        <Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
        
        
        {success && (
            <Alert variant="success">Successfully updated Todo Title to: {newTodoTitle}</Alert>
        )}

        {error && (
            <Alert variant="danger">{error}</Alert>
        )}
    </div>
  )
}

export default EditTodoPage