import { render, screen } from "@testing-library/react"
import TodoForm from "../TodoForm"
import { describe, expect, it } from "vitest"

const fakeOnSave = async () => {
	return
}

describe("Todo Form", () => {
	it("Renders input field initially empty", () => {
		// Render
		render(<TodoForm onSave={fakeOnSave} />)

		// Find
		const input = screen.getByRole("textbox")

		// Assert
		expect(input).toHaveValue("")
	})
})
