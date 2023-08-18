import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Todo, Todos } from '../types'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todos|null>(null)
	const location = useLocation()

	const { data, error, isFetching } = useQuery({
		queryKey: ['todos'],
		queryFn: TodosAPI.getTodos
	})

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			{location.state?.message && (
				<Alert variant="success" dismissible>
					{location.state.message}
				</Alert>
			)}


			{data && data.length > 0 && (
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

			{data && data.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}


		</>
	)
}

export default TodosPage