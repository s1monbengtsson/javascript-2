import { render, screen } from "@testing-library/react"
import TodoList from "../TodoList"
import { describe, expect, it } from "vitest"
import { Todo } from "../../../types/Todo.types"
import { v4 as uuid } from "uuid"

const fakeFn = async () => {
	return
}

const todoTitle = "This is my todo"
const createTodo = (title: string): Todo => {
	return {
		id: uuid(),
		title,
		completed: false,
	}
}
const initialTodos: Todo[] = []

describe("Todos List", () => {
	it("List is initially empty", () => {
		render(
			<TodoList
				todos={initialTodos}
				onDelete={fakeFn}
				onToggle={fakeFn}
			/>
		)

		// Find any list item elements
		const listItemElements = screen.queryAllByRole("listitem")

		// Expect list to be empty
		expect(listItemElements).toHaveLength(0)
	})

	it("Displays a todo", () => {
		const todos: Todo[] = []
		todos.push(createTodo(todoTitle))

		render(<TodoList todos={todos} onDelete={fakeFn} onToggle={fakeFn} />)

		// Find any list item elements
		const listItemElements = screen.queryAllByRole("listitem")

		// Expect list to be empty
		expect(listItemElements).toHaveLength(1)
	})
})
