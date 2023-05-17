import React from 'react'
import { useState } from 'react'
import {CreateTodoData, Todo} from '../types/index'
import * as TodoAPI from '../services/TodosAPI'

interface IProps {
  onAddTodo: (todo: Todo) => void
  
}

const AddNewTodo: React.FC<IProps> = ({ onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()


		const postTodo = async (todo: Todo) => {
			try {
				const data = await TodoAPI.createTodo(todo)
				console.log("new todo:", data)
				return data
			} catch (err) {
				throw new Error("Could not create todo")
			}
		}
		

		// create a new todo and set a new todos state
		const newTodo: CreateTodoData = {
			title: newTodoTitle,
			completed: false,
		}

		postTodo(newTodo)
		onAddTodo(newTodo)
		

		// clear newTodoTitle state
		setNewTodoTitle("")
	}
  return (
    <>
      <form onSubmit={handleSubmit}>
					<div className="input-container">
						<input 
							className="input-field"
							type="text"
							placeholder="New Todo"
							required
							minLength={3}
              onChange={e => setNewTodoTitle(e.target.value)}
              value={newTodoTitle}
						/>
            
						<button disabled={newTodoTitle.trim().length < 2} type="submit" className="form-button">Create New Todo</button>
					</div>
          {newTodoTitle.trim().length < 2 && (
            <p className="hint">Todo has to be at least 2 characters long</p>
          )}
				</form>
    </>
  )
}

export default AddNewTodo