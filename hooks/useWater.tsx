import { api } from '@/services/api'
import { createContext, ReactNode, useContext } from 'react'
import { useAuth } from './useAuth'

interface WaterProps {
  saveWaterGoal(goal: number): Promise<void>
  getWaterGoal(): Promise<number>
}

const AuthContext = createContext({} as WaterProps)

export function WaterProvider({ children }: { children: ReactNode }) {
  const Auth = useAuth()

  async function saveWaterGoal(goal: number) {
    await api.patch('/me/goal', { water_goal: goal })

    Auth.changeWaterGoalInUserDataObject(goal)
  }

  async function getWaterGoal() {
    const response = await api.get<number>('/me/goal')
    return response.data
  }

  return (
    <AuthContext.Provider
      value={{
        saveWaterGoal,
        getWaterGoal
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useWater(): WaterProps {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useWater deve ser usado dentro de WaterProvider')
  }
  return context
}
