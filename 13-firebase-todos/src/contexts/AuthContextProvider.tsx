import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createContext, useState } from 'react'
import { auth } from '../services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => void
	signup: (email: string, password: string) => Promise<UserCredential>
	userEmail: string | null
	isLoggedIn: boolean
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User|null>(null)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
        return signOut(auth)
	}

	const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }
    
	// add auth-state observer here (somehow... 😈)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("user is signed in:", user.email)
			setCurrentUser(user)
            setUserEmail(user.email)
			setIsLoggedIn(true)
        } else {
            console.log("user is signed out:")
            setUserEmail(null)
			setIsLoggedIn(false)
        }
    })

	console.log("Logged in as:", currentUser)

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			signup,
			userEmail,
			isLoggedIn
		}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider