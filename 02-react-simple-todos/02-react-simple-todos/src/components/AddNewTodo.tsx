import React from 'react'
import { useState } from 'react'
import {Todo} from '../types/index'

interface IProps {
  onAddTodo: (todo: Todo) => void
  
}

const AddNewTodo: React.FC<IProps> = ({ onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// create a new todo and set a new todos state
		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}

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
            
						<button disabled={newTodoTitle.length < 3} type="submit" className="form-button">Create New Todo</button>
					</div>
          {newTodoTitle.length < 3 && (
            <p className="hint">Todo has to be at least 3 characters long</p>
          )}
				</form>
    </>
  )
}

export default AddNewTodo