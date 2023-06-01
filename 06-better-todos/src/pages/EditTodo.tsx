import React, { useEffect } from 'react'
import * as TodosAPI from '../services/TodosAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Todo } from '../types'
import Alert from 'react-bootstrap/Alert'

const EditTodo = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const todoId = Number(id)
    const [success, setSuccess] = useState<boolean|null>(null) 
    const [error, setError] = useState<string|null>(null) 

    const [todo, setTodo] = useState<Todo|null>(null)
    const [newTodoTitle, setNewTodoTitle] = useState<string|null>(null)

    const getTodo = async (todoId: number) => {
        const data = await TodosAPI.getTodo(todoId)

        setTodo(data)
    }

    useEffect(() => {
        getTodo(todoId)
    }, [todoId])


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
            }, 1500)


        } catch (err: any) {
            setError("Could not update Todo Title")
        }
	}

    console.log("new title:", newTodoTitle)
    if (!todo) {
        return
    }

  return (
    
    <div>
        <h1>{todo.title}</h1>
        <p>todo id: {todoId}</p>

        <form className="mb-3" onSubmit={handleSubmit}>
			<div className="input-group">
				<input
					onChange={(e) => setNewTodoTitle(e.target.value)}
					type="text"
					className="form-control"
					placeholder="New Todo title"
				/>

				<button
					type="submit"
					className="btn btn-success"
				>Update Todo Title</button>

			</div>
		</form>
        {success && (
            <Alert variant="success">Successfully updated Todo Title to: {newTodoTitle}</Alert>
        )}

        {error && (
            <Alert variant="danger">{error}</Alert>
        )}
    </div>
  )
}

export default EditTodo