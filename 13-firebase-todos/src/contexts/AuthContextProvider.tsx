import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential>
	userEmail: string | null
}

// This creates the actual context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [userEmail, setUserEmail] = useState<string | null>(null)

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
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log("Auth state changed:", user)
			setCurrentUser(user)

			if (user) {
				// User is logged in
				setUserEmail(user.email)
			} else {
				// No user is logged in
				setUserEmail(null)
			}
			setLoading(false)
		})

		return unsubscribe
	}, [])

	console.log("currentUser:", currentUser)

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			signup,
			userEmail,
		}}>
			{loading ? (
				<div id="initial-loader">
					<SyncLoader color={'#888'} size={15} speedMultiplier={1.1} />
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider