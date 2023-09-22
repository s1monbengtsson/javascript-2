import { render, screen } from "@testing-library/react"
import TodoCounter from "../TodoCounter"
import { describe, expect, it } from "vitest"

describe("TodoCounter", () => {
	it("Shows correct count with no todos", () => {
		// Render
		render(<TodoCounter count={0} />)

		// Find
		const textElement = screen.getByText(/0 todos/i)

		// Assert
		expect(textElement).toBeInTheDocument()
	})

	it("Shows correct count with a single todo", () => {
		// Render
		render(<TodoCounter count={1} />)

		// Find
		const textElement = screen.getByText(/1 todo left/i)

		// Assert
		expect(textElement).toBeInTheDocument()
	})

	it("Shows correct count with multiple todo", () => {
		// Render
		render(<TodoCounter count={5} />)

		// Find
		const textElement = screen.getByText(/5 todos left/i)

		// Assert
		expect(textElement).toBeInTheDocument()
	})
})
