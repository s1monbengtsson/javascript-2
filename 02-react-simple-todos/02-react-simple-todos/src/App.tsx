import { useEffect, useState } from 'react'
import { Todo, TodoList } from './types'
import TodoListItem from './components/TodoListItem'
import TodoCounter from './components/TodoCounter'
import AddNewTodo from './components/AddNewTodo'
import './App.css'

function App() {
	const [todos, setTodos] = useState<TodoList>([
		{ title: "Drink coffee", completed: true },
		{ title: "Learn React", completed: true },
		{ title: "Drink MOAR coffee", completed: false },
		{ title: "Become React Master", completed: false },
	])

	const addTodo = (todo: Todo) => {
		setTodos([...todos, todo])
	}
	

	const deleteTodo = (todoToDelete: Todo) => {
		// set a new list of todos where the clicked todo is excluded
		setTodos(todos.filter(todo => todo !== todoToDelete))
	}

	const toggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

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
					<ul className="todo-list">
						<span className="section-title">Uncompleted Todos</span>
						{unfinishedTodos.map((todo, index) => (
							
							<TodoListItem 
								onToggle={toggleTodo}
								onDelete={deleteTodo}
								todo={todo} 
								key={index} 
							/>
						) )}
					</ul>

					<ul className="todo-list">
						<span className="section-title">Completed Todos</span>
						{finishedTodos.map((todo, index) => (
							<TodoListItem
								onToggle={toggleTodo}
								onDelete={deleteTodo}
								todo={todo}
								key={index}
								
							/>
						) )}
					</ul>
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