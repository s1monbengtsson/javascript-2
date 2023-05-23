import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Todo} from '../types/index'

interface IProps {
  onAddTodo: (todo: Todo) => void
  
}

const AddNewTodo: React.FC<IProps> = ({ onAddTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("")
	const newTodoTitleRef = useRef<HTMLInputElement>(null)

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

	// on component mount, focus on input field
	useEffect(() => {
		newTodoTitleRef.current?.focus()
	}, [])
  return (
    <>
      <form onSubmit={handleSubmit}>
					<div className="input-container">
						<input 
							ref={newTodoTitleRef}
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