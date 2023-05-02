import { useState } from 'react'
import './App.css'
import { Todo } from './types'

function App() {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, title: "Create React Todo", completed: false },
		{ id: 2, title: "Watch Net Ninja Videos", completed: false }
	])

	const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const todoId = todos.length+1

		const newTodo: Todo = { id: todoId, title: newTodoTitle, completed: false}

		setTodos([...todos, newTodo])
		setNewTodoTitle("")

		console.log("todo id:", todoId)
		console.log("todo id:", newTodo)
	}

	const handleToggleTodo = (todo: Todo) => {
		
		todo.completed = !todo.completed
		setTodos([...todos])

		console.log("todos:", todos)
	}

	const handleRemoveTodo = (todoToDelete: Todo) => {
		console.log("removing todo:", todoToDelete)
		setTodos(todos.filter(todo => todo !== todoToDelete))
	}

	const completedTodos = todos.filter(todo => todo.completed === true)
	const uncompletedTodos = todos.filter(todo => todo.completed === false) 

	return (
		<div>
			<h1 className="primary-heading">React Todos</h1>
			
			{todos.length > 0 && (
			<main>
				<ul className="todo-list">
				<h2 className="todo-heading">Uncompleted Todos</h2>
				{uncompletedTodos.map((todo, index) => (
					<li
					key={index}
					className="todo-item"
					>

						<p>{todo.id}: {todo.title}</p>

						<div className="button-wrapper">
							<button 
							className="todo-button" 
							onClick={() => handleToggleTodo(todo)}>✅
							</button>
							<button 
							className="todo-button" 
							onClick={() => handleRemoveTodo(todo)}>🗑
							</button>
						</div>
					</li>
				))}
				{uncompletedTodos.length > 0 && (
					<p className="hint">Click the checkmark to complete it</p>
				)}
				</ul>

				<ul className="todo-list">
				<h2 className="todo-heading">Completed Todos</h2>
				{completedTodos.map((todo, index) => (
					<li
					key={index}
					className="todo-item"
					>
						<p
							className="completed">
							{todo.id}: {todo.title}
						</p>

						<div className="button-wrapper">
							<button 
							className="todo-button" 
							onClick={() => handleToggleTodo(todo)}>↩️
							</button>
							<button 
							className="todo-button" 
							onClick={() => handleRemoveTodo(todo)}>🗑
							</button>
						</div>
					</li>
				))}

				{completedTodos.length > 0 && (
					<p className="hint">Click the arrow to uncomplete it</p>
				)}
				</ul>
			</main>
			)}

			{todos.length === 0 && (
				<p className="list-empty">You currently have zero todos</p>
			)}

			<form onSubmit={handleFormSubmit}>
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
					<button type="submit" className="form-button">Create New Todo</button>
				</div>
			</form>

			<p className="completed-todos">{completedTodos.length}/{todos.length} Todos Completed</p>
		</div>
	)
}

export default App
