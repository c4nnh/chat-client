import { NavigateFunction, useNavigate } from 'react-router-dom'

const Hooks: {
  navigate?: NavigateFunction
} = {}

export default Hooks

export const HooksSetter = () => {
  Hooks.navigate = useNavigate()

  return null
}
