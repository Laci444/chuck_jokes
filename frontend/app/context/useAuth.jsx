import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const login = (user, token) => {
        setUser(user)
        setToken(token)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
