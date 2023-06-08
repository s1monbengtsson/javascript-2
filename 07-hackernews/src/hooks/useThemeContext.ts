import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeProvider"

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

export default useThemeContext