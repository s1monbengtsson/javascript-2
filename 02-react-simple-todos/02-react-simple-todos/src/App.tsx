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

	const addTodo = (todo: Todo) => {
		console.log("added todo:", todo)
		setTodos([...todos, todo])
	}
	
	const deleteTodo = async (todoToDelete: Todo) => {
		try {
			await TodosAPI.deleteTodo(todoToDelete.id!)
			// set a new list of todos where the clicked todo is excluded
			setTodos(todos.filter(todo => todo !== todoToDelete))
			getTodos()
		} catch (err) {
			throw new Error("Could not delete todo")
		}
	}

	const toggleTodo = async (todo: Todo) => {
		try {
			console.log("clicked todo with id:", todo.id)
			await TodosAPI.updateTodo(todo.id!, {
				completed: !todo.completed
			})
			setTodos([...todos])
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

	// This will only be executed when the component is mounted,
	// and only AFTER the component has been rendered
	useEffect(() => {
		console.log("Look mom, I'm a newly mounted component 👶🏻")
	}, [])

	// This will only be executed if `finishedTodos.length` or `todos.length`
	// have changed since last render, and only AFTER the component has been rendered
	useEffect( () => {
		console.log("Updating page title using an effect")
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
					onAddTodo={addTodo}
				/>

				<TodoCounter 
					todos={todos.length}
					finishedTodos={finishedTodos.length}
				/>

				
		</div>
	)
}

export default App