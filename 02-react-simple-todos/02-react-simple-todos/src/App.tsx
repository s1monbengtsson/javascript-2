import { useEffect, useState } from 'react'
import { Todo, Todos } from './types'
import TodoList from './components/TodoList'
import TodoCounter from './components/TodoCounter'
import AddNewTodo from './components/AddNewTodo'
import * as TodosAPI from './services/TodosAPI'
import './App.css'

function App() {
	const [todos, setTodos] = useState<Todos>([])

	const getTodos = async () => {
		try {
			const data = await TodosAPI.getTodos()
			setTodos(data)
		} catch (err) {
			throw new Error("Could not get todos")
		}
	}

	const createTodo = async (todo: Todo) => {
		try {
			await TodosAPI.createTodo(todo)
			getTodos()
		} catch (err) {
			throw new Error("Could not create todo")
		}
	}
	
	const deleteTodo = async (todoToDelete: Todo) => {

		if (!todoToDelete.id || typeof todoToDelete.id === "undefined") {
			return
		}

		try {
			await TodosAPI.deleteTodo(todoToDelete.id)
			// set a new list of todos where the clicked todo is excluded
			getTodos()
		} catch (err) {
			throw new Error("Could not delete todo")
		}
	}

	const toggleTodo = async (todo: Todo) => {

		if (!todo.id || typeof todo.id === "undefined") {
			return
		}

		try {
			console.log("clicked todo with id:", todo.id)
			await TodosAPI.updateTodo(todo.id, {
				completed: !todo.completed
			})
			getTodos()
		} catch (err) {
			throw new Error("Could not toggle todo")
		}
	}

	// fetch todos when app is being mounted
	useEffect(() => {
		getTodos()
	}, [])

	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)


	// This will only be executed if `finishedTodos.length` or `todos.length`
	// have changed since last render, and only AFTER the component has been rendered
	useEffect( () => {
		document.title = `${finishedTodos.length} of ${todos.length} completed`
	}, [finishedTodos.length, todos.length] )

	console.log("Rendering...")

	return (
		<div className="container">
			<h1 className="primary-heading">React Todos</h1>

			{todos.length > 0 && (
				<main>

					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={unfinishedTodos}
						value="Uncompleted Todos"
					/>

					<TodoList 
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={finishedTodos}
						value="Completed Todos"
					/>
				</main>
			)}

				<AddNewTodo 
					onAddTodo={createTodo}
				/>

				<TodoCounter 
					todos={todos.length}
					finishedTodos={finishedTodos.length}
				/>
		</div>
	)
}

export default App