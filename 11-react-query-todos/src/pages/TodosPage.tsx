import { useQuery } from '@tanstack/react-query'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import TodoCounter from '../components/TodoCounter'
import AddNewTodoForm from '../components/AddNewTodoForm'
import { Todo } from '../types/Todo.types'

const TodosPage = () => {
	const location = useLocation()

	const { data, isError, refetch } = useQuery({
		queryKey: ['todos'],
		queryFn: TodosAPI.getTodos
	})

	const addTodo = async (todo: Todo) => {
		await TodosAPI.createTodo(todo)
		refetch()
	}
	
	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo}/>

			{isError && <p>Something went wrong...</p>}

			{location.state?.message && (
				<Alert variant="success" dismissible>
					{location.state.message}
				</Alert>
			)}


			{data && (
				<ListGroup className="todolist">
					{data.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{data && (
				<div className='text-center text-muted mt-2'>
					<TodoCounter 
						todos={data.length}
						finishedTodos={data.filter(todo => todo.completed).length}
					/>
				</div>
			)}

			{data && data.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage