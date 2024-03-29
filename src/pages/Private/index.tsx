import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { io } from 'socket.io-client'
import { END_POINTS } from '../../constants'
import { SocketContext } from '../../contexts'
import { PrivateLayout } from '../../layouts'
import { useAuthStore } from '../../stores'
import { getToken } from '../../utils'
import { Game } from './Game'
import { Message } from './Messaging'
import { Profile } from './Profile'
import { Setting } from './Setting'

export const PrivatePages: React.FC = () => {
  const { user } = useAuthStore()

  const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
    extraHeaders: {
      authorization: `Bearer ${getToken().accessToken}`,
    },
    reconnectionAttempts: 3,
    autoConnect: false,
  })

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [socket])

  if (!user) return <Navigate to={`/${END_POINTS.AUTH.MASTER}`} replace />

  return (
    <SocketContext.Provider value={{ socket }}>
      <PrivateLayout>
        <Routes>
          <Route
            path={`${END_POINTS.PRIVATE.MESSAGE}/*`}
            element={<Message />}
          />
          <Route
            path={`${END_POINTS.PRIVATE.GAME.MASTER}/*`}
            element={<Game />}
          />
          <Route path={END_POINTS.PRIVATE.PROFILE} element={<Profile />} />
          <Route path={END_POINTS.PRIVATE.SETTING} element={<Setting />} />
          <Route
            path=""
            element={<Navigate to={END_POINTS.PRIVATE.MESSAGE} replace />}
          />
        </Routes>
      </PrivateLayout>
    </SocketContext.Provider>
  )
}
