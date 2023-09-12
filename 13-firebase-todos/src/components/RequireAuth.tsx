import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

type IRequireAuthProps = {
    children: React.ReactNode
}

const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
    const { currentUser } = useAuth()

    return (
        currentUser
            ?   <>{children}</>
            :   <Navigate to='/login' />
    )
}

export default RequireAuth