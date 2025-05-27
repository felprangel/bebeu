import axios from 'axios'

export const api = axios.create({
  // TODO: url estática temporáriamente, não consegui fazer os envs funcionarem
  baseURL: 'https://bookmark-api.felpo.dev'
})
