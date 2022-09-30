import { NavigateFunction, useNavigate } from 'react-router-dom'

export const hooks: {
  navigate?: NavigateFunction
} = {}

export const HooksSetter = () => {
  hooks.navigate = useNavigate()

  return null
}
