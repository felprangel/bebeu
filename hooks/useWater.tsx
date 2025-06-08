import { api } from '@/services/api'
import { createContext, ReactNode, useContext } from 'react'

interface WaterProps {
  saveWaterGoal(goal: number): void
}

const AuthContext = createContext({} as WaterProps)

export function WaterProvider({ children }: { children: ReactNode }) {
  async function saveWaterGoal(goal: number) {
    await api.patch('/me/goal', { water_goal: goal })
  }

  return (
    <AuthContext.Provider
      value={{
        saveWaterGoal
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
