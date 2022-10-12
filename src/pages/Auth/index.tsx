import { useContext, useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { END_POINTS } from '../../constants'
import { SocketContext } from '../../contexts'
import { AuthLayout } from '../../layouts'
import { useAuthStore } from '../../stores'
import { Login } from './Login'
import { Register } from './Register'

export const AuthPages: React.FC = () => {
  const { user } = useAuthStore()

  const { socket } = useContext(SocketContext)

  useEffect(() => {
    console.log('here login')

    socket.disconnect()
  }, [socket])

  if (user) {
    return <Navigate to={`/${END_POINTS.PRIVATE.MASTER}`} replace />
  }

  return (
    <AuthLayout>
      <Routes>
        <Route path={END_POINTS.AUTH.LOGIN} element={<Login />} />
        <Route path={END_POINTS.AUTH.REGISTER} element={<Register />} />
        <Route
          path=""
          element={<Navigate to={END_POINTS.AUTH.LOGIN} replace />}
        />
      </Routes>
    </AuthLayout>
  )
}
