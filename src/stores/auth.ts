import { LoginResponse, User } from '../models'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { clearToken, setToken } from '../utils'

type AuthState = {
  user?: User
  me: (user: User) => void
  login: (response: LoginResponse) => void
  logout: () => void
}

const theme2 = {
  color: '#93c5fd',
  bgColor: '#e5e7eb',
}

export const useAuthStore = create<AuthState>()(
  persist(set => ({
    login: response => {
      const { user, token } = response
      set({
        user: {
          ...user,
          theme: theme2,
        },
      })
      setToken(token)
    },
    logout: () => {
      set({
        user: undefined,
      })
      clearToken()
    },
    me: user => {
      set({ user })
    },
  }))
)
