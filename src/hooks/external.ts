import { NavigateFunction, useNavigate } from 'react-router-dom'
import { AuthState, useAuthStore } from '../stores'

export const exterrnalHooks: {
  navigate?: NavigateFunction
  authStore?: AuthState
} = {}

export const ExternalHooksSetter = () => {
  exterrnalHooks.navigate = useNavigate()
  exterrnalHooks.authStore = useAuthStore()

  return null
}
