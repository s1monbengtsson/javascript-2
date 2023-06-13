import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContextProvider"

const useThemeContext = () => {
	const themeContext = useContext(ThemeContext)

	if (!themeContext) {
		throw new Error("Trying to use themeContext outside of ThemeContextProvider")
	}

	return themeContext
}

export default useThemeContext
