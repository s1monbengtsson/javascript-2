import { createContext, useState } from 'react'
import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'

type AuthContextType = {
    signup: (email: string, password: string) => Promise<UserCredential>
    userEmail: string | null
}

export const AuthContext = createContext<AuthContextType|null>(null)

type Props = {
    children: React.ReactNode
}

const AuthContextProvider: React.FC<Props> = ({ children }) => {

    const [userEmail, _setUserEmail] = useState<string|null>(null)

    const signup = async (email: string, password: string) => {
        console.log("would sign up user from AuthContext", email, password)

        // sign up user in Firebase Authentication
        const userCredentials = createUserWithEmailAndPassword(auth, email, password)

        return userCredentials
    }

    return (
        <AuthContext.Provider value={{
            signup,
            userEmail
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider