import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { END_POINTS } from './constants'
import { AuthPages, PrivatePages } from './pages'
import { useAuthStore } from './stores'

const defaultTheme = {
  color: '#fca5a5',
  bgColor: '#e5e7eb',
}

export const App: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <ThemeProvider theme={user?.theme || defaultTheme}>
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
    </ThemeProvider>
  )
}
