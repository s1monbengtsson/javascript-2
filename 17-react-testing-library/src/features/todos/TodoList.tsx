import React from "react"
import { Todo } from "../../types/Todo.types"
import ListGroup from "react-bootstrap/ListGroup"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"

type Props = {
	todos: Todo[]
	onToggle: (id: string) => void
	onDelete: (id: string) => void
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => {
	return (
		<ListGroup className="todolist">
			{todos.map(todo => (
				<ListGroup.Item
					key={todo.id}
					className={todo.completed ? "done" : ""}
				>
					<span className="todo-title">{todo.title}</span>
					<ButtonGroup>
						<Button
							variant="outline-success"
							size="sm"
							onClick={() => onToggle(todo.id)}
						>
							{todo.completed ? "Undo" : "Done"}
						</Button>
						<Button
							variant="outline-danger"
							size="sm"
							onClick={() => onDelete(todo.id)}
						>
							Delete
						</Button>
					</ButtonGroup>
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}

export default TodoList
