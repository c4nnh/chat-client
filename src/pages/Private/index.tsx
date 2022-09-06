import { Navigate, Route, Routes } from 'react-router-dom'
import { END_POINTS } from '../../constants'
import { PrivateLayout } from '../../layouts'
import { useAuthStore } from '../../stores'
import { Message } from './Message'

export const PrivatePages: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) return <Navigate to={`/${END_POINTS.AUTH.MASTER}`} replace />

  return (
    <PrivateLayout>
      <Routes>
        <Route path={END_POINTS.PRIVATE.MESSAGE} element={<Message />} />
        <Route
          path=""
          element={<Navigate to={END_POINTS.PRIVATE.MESSAGE} replace />}
        />
      </Routes>
    </PrivateLayout>
  )
}
