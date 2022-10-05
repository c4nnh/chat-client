import { LoginResponse, UpdateUserDto, User } from '../models'
import create from 'zustand'
import { clearToken, setToken } from '../utils'

export type AuthState = {
  user?: User
  me: (user: User) => void
  updateUser: (data: UpdateUserDto) => void
  login: (response: LoginResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
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
  },
  me: user => {
    set({
      user,
    })
  },
  updateUser: data => {
    const cur = get().user
    if (cur) {
      set({
        user: {
          ...cur,
          ...data,
        },
      })
    }
  },
}))
