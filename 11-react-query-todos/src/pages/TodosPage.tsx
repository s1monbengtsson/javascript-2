import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Todo, Todos } from '../types/Todo.types'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation } from 'react-router-dom'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert'
import TodoCounter from '../components/TodoCounter'

const TodosPage = () => {
	const location = useLocation()

	const { data, isError, isFetching } = useQuery({
		queryKey: ['todos'],
		queryFn: TodosAPI.getTodos
	})

	if (!data) {
		return
 	}
	
	const finishedTodos = data.filter(todo => todo.completed)

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			{isFetching && <p>Loading...</p>}

			{isError && <p>Something went wrong...</p>}

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

			{data.length > 0 && (
				<div className='text-center text-muted mt-2'>
					<TodoCounter 
						todos={data.length}
						finishedTodos={finishedTodos.length}
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