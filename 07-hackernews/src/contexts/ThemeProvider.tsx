import { createContext, useState } from 'react'

// This creates the actual context and sets the context's initial/default value
type ThemeContextType = {
  isDarkMode: boolean
  toggleTheme?: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false
})

interface IProps {
    children: React.ReactNode
}

// This allows us to wrap <App /> and provide theme to our children and grandchildren etc
const ThemeProvider: React.FC<IProps> = ({ children }) => {
    const [isDarkMode, setisDarkMode] = useState<boolean>(false)

    const toggleTheme = () => {
      setisDarkMode(!isDarkMode)
    }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider