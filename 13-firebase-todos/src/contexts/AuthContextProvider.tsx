import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
	updateProfile,
	updateEmail,
	updatePassword,
	sendPasswordResetEmail,
	reload,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import { auth } from '../services/firebase'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	signup: (email: string, password: string) => Promise<UserCredential>
	reloadUser: () => Promise<boolean>
	resetPassword: (email: string) => Promise<void> 
	setEmail: (email: string) => Promise<void>
	setDisplayName: (name: string) => Promise<void>
	setPassword: (password: string) => Promise<void>
	setPhotoUrl: (photoURL: string) => Promise<void>
	userEmail: string | null
	userName: string | null
	userPhotoUrl: string | null
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
	const [userName, setUserName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const reloadUser = async () => {
		if (!auth.currentUser) {
			return false
		}

		await reload(auth.currentUser)

		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + '/login'
		})
	}

	const setEmail = (email: string) => {
		if (!currentUser) throw new Error("Current user is null!")
		setUserEmail(email)
		return updateEmail(currentUser, email)
	}

	const setPassword = (password: string) => {
		if (!currentUser) throw new Error("Current user is null!")
		return updatePassword(currentUser, password)
	}

	const setDisplayName = (name: string) => {
		if (!currentUser) throw new Error("Current user is null!")
		setUserName(name)
		return updateProfile(currentUser, {
			displayName: name
		})
	}

	const setPhotoUrl = (photoURL: string) => {
		if (!currentUser) throw new Error("Current user is null!")
		setUserPhotoUrl(photoURL)
		return updateProfile(currentUser, {
			photoURL
		})
	}

	// add auth-state observer here (somehow... 😈)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)

			if (user) {
				// User is logged in
				setUserEmail(user.email)
				setUserName(user.displayName)
				setUserPhotoUrl(user.photoURL)
			} else {
				// No user is logged in
				setUserEmail(null)
				setUserName(null)
				setUserPhotoUrl(null)
			}
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider value={{
			currentUser,
			login,
			logout,
			signup,
			reloadUser,
			resetPassword,
			setPassword,
			setDisplayName,
			setEmail,
			setPhotoUrl,
			userEmail,
			userName,
			userPhotoUrl,
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