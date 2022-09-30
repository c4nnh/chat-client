import { LoginResponse, User } from '../models'
import create from 'zustand'
import { clearToken, setToken } from '../utils'

type AuthState = {
  user?: User
  me: (user: User) => void
  login: (response: LoginResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(set => ({
  login: response => {
    const { user, token } = response
    set({
      user: {
        ...user,
      },
    })
    setToken(token)
  },
  logout: () => {
    set({
      user: undefined,
    })
    clearToken()
    localStorage.removeItem('authStore')
  },
  me: user => {
    set({ user })
  },
}))
