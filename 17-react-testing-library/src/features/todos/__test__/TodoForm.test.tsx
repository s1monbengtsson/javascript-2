import { render, screen } from "@testing-library/react"
import TodoForm from "../TodoForm"
import { describe, expect, it } from "vitest"
import { renderWithUserInteraction } from "../../../tests/helpers"

const fakeOnSave = async () => {
	return
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

describe("Todo Form validation", () => {
	it("Shows validation error if input is empty", async () => {
		// Render
		const { user } = renderWithUserInteraction(
			<TodoForm onSave={fakeOnSave} />
		)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, "{Enter}")

		// Find element that got rendered after interaction
		const validationErrorElement = screen.getByText(
			/You have to write something/
		)

		// Assert
		expect(validationErrorElement).toBeInTheDocument()
	})

	it("Shows validation error if input is too short", async () => {
		// Render
		const { user } = renderWithUserInteraction(
			<TodoForm onSave={fakeOnSave} />
		)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, "lol")
		await user.type(inputElement, "{Enter}")

		// Find element that got rendered after interaction
		const validationErrorElement = screen.getByText(/too short/i)

		// Assert
		expect(validationErrorElement).toBeInTheDocument()
	})

	it("Does not show validation error if input is valid", async () => {
		// Render
		const { user } = renderWithUserInteraction(
			<TodoForm onSave={fakeOnSave} />
		)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, "This title is valid")
		await user.type(inputElement, "{Enter}")

		// Find element that got rendered after interaction
		const validationErrorElement = screen.queryByText(/too short/i)

		// Assert
		expect(validationErrorElement).not.toBeInTheDocument()
	})
})
