import { LoginResponse, User } from '../models'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { clearToken, setToken } from '../utils'

type AuthState = {
  user?: User
  login: (response: LoginResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(set => ({
    login: response => {
      const { user, token } = response
      set({ user })
      setToken(token)
    },
    logout: () => {
      set({
        user: undefined,
      })
      clearToken()
    },
  }))
)
