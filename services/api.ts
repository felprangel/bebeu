import { TOKEN_KEY } from '@/database/local'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export const api = axios.create({
  // TODO: url estática temporáriamente, não consegui fazer os envs funcionarem
  baseURL: 'https://bookmark-api.felpo.dev'
})

api.interceptors.request.use(
  async request => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  error => Promise.reject(error)
)
