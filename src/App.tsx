import { Navigate, Route, Routes } from 'react-router-dom'
import { useMeQuery } from './apis'
import { Loading } from './components'
import { END_POINTS } from './constants'
import { AuthPages, PrivatePages } from './pages'
import { useAuthStore } from './stores'
import { getToken } from './utils'
export const App: React.FC = () => {
  const { me, user } = useAuthStore()
  const tokens = getToken()

  const { isFetching } = useMeQuery({
    enabled: !!tokens && !!tokens.accessToken && !user,
    onSuccess: me,
  })

  if (isFetching) {
    return <Loading />
  }

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
