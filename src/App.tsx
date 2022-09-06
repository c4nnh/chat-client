import { Navigate, Route, Routes } from 'react-router-dom'
import { END_POINTS } from './constants'
import { AuthPages, PrivatePages } from './pages'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={`${END_POINTS.AUTH.MASTER}/*`} element={<AuthPages />} />
      <Route
        path={`${END_POINTS.PRIVATE.MASTER}/*`}
        element={<PrivatePages />}
      />
      <Route
        path="/*"
        element={<Navigate to={END_POINTS.PRIVATE.MASTER} replace />}
      />
    </Routes>
  )
}
