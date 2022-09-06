import { Navigate, Routes, Route } from 'react-router-dom'
import { END_POINTS } from '../../constants/endpoints'
import { useAuthStore } from '../../stores'
import { Login } from './Login'
import { Register } from './Register'

export const AuthPages: React.FC = () => {
  const { user } = useAuthStore()

  if (user) {
    return <Navigate to={END_POINTS.PRIVATE.MASTER} replace />
  }

  return (
    <Routes>
      <Route path={END_POINTS.AUTH.LOGIN} element={<Login />} />
      <Route path={END_POINTS.AUTH.REGISTER} element={<Register />} />
      <Route
        path="*"
        element={<Navigate to={END_POINTS.AUTH.LOGIN} replace />}
      />
    </Routes>
  )
}
