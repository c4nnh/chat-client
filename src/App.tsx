import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useMeQuery } from './apis'
import { Loading } from './components'
import { END_POINTS } from './constants'
import { SocketContext } from './contexts'
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

  const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
    extraHeaders: {
      authorization: `Bearer ${getToken().accessToken}`,
    },
    reconnectionAttempts: 3,
    autoConnect: false,
  })

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isFetching) {
    return <Loading />
  }

  return (
    <SocketContext.Provider value={{ socket }}>
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
    </SocketContext.Provider>
  )
}
