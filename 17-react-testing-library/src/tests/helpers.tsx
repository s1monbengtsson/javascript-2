import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

export const renderWithUserInteraction = (
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
