import { render, screen } from "@testing-library/react"
import TodoForm from "../TodoForm"
import { describe, expect, it } from "vitest"
import userEvent from "@testing-library/user-event"

const fakeOnSave = async () => {
	return
}

const renderWithUserInteraction = (
	component: React.ReactElement<
		any,
		string | React.JSXElementConstructor<any>
	>
) => {
	return {
		user: userEvent.setup(),
		...render(component),
	}
}

const todoTitle = "this is my todo title"

describe("Todo Form", () => {
	it("Renders input field initially empty", () => {
		// Render
		render(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Assert
		expect(inputElement).toHaveValue("")
	})

	it("Can type into input field", async () => {
		const todoTitle = "this is my todo title"
		// Render
		const { user } = renderWithUserInteraction(
			<TodoForm onSave={fakeOnSave} />
		)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, todoTitle)

		// Asert
		expect(inputElement).toHaveValue(todoTitle)
	})

	it("Empties input field after clicking on 'save' button", async () => {
		// Render
		const { user } = renderWithUserInteraction(
			<TodoForm onSave={fakeOnSave} />
		)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")
		const btnSaveElement = screen.getByRole("button", { name: /save/i })

		// Interact
		await user.type(inputElement, todoTitle)
		await user.click(btnSaveElement)

		// Asert
		expect(inputElement).toHaveValue("")
	})

	it("Empties input field after pressing enter", async () => {
		// Render
		const { user } = renderWithUserInteraction(
			<TodoForm onSave={fakeOnSave} />
		)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, todoTitle)
		await user.type(inputElement, "{Enter}")

		// Asert
		expect(inputElement).toHaveValue("")
	})
})
