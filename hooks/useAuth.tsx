import { TOKEN_KEY, USER_DATA_KEY } from '@/database/local'
import { api } from '@/services/api'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface AuthProps {
  register(data: RegisterData): Promise<void>
  login(data: LoginData): Promise<void>
  logout(): void
  loggedIn: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
  password_confirmation: string
}

interface UserData {
  name: string
  water_goal: number
}

interface AuthResponse {
  token: string
}

interface LoginResponse extends AuthResponse {
  user_data: UserData
}

const AuthContext = createContext({} as AuthProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const Router = useRouter()
  const [token, setToken] = useState<string>()
  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    getTokenFromStorage()
    getUserDataFromStorage()
  }, [])

  useEffect(() => {
    if (!token || !userData) {
      return
    }

    if (!userData.water_goal) {
      Router.replace('/weight')
    }

    Router.replace('/home')
  }, [token, userData, Router])

  async function getTokenFromStorage() {
    const storageToken = await SecureStore.getItemAsync(TOKEN_KEY)

    if (storageToken) {
      setToken(storageToken)
    }
  }

  async function getUserDataFromStorage() {
    const storageUserData = await SecureStore.getItemAsync(USER_DATA_KEY)

    if (storageUserData) {
      setUserData(JSON.parse(storageUserData))
    }
  }

  async function login(data: LoginData): Promise<void> {
    try {
      const response = await api.post<LoginResponse>('/login', data)
      const apiToken = response.data.token.split('|')[1]
      const userData = response.data.user_data

      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData))
      await SecureStore.setItemAsync(TOKEN_KEY, apiToken)
      setToken(apiToken)
    } catch (error) {
      console.error('Erro no login:', error)
    }
  }

  async function register(data: RegisterData): Promise<void> {
    try {
      const response = await api.post<AuthResponse>('/register', data)
      const apiToken = response.data.token.split('|')[1]

      await SecureStore.setItemAsync(TOKEN_KEY, apiToken)
      setToken(apiToken)
    } catch (error) {
      console.error('Erro no registro:', error)
    }
  }

  async function logout() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY)
      Router.push('/')
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        loggedIn: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthProps {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
