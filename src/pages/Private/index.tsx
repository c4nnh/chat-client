import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { END_POINTS } from '../../constants'
import { SocketContext } from '../../contexts'
import { PrivateLayout } from '../../layouts'
import { useAuthStore } from '../../stores'
import { Game } from './Game'
import { Message } from './Messaging'
import { Profile } from './Profile'
import { Setting } from './Setting'

export const PrivatePages: React.FC = () => {
  const { user } = useAuthStore()
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    if (user) {
      socket.connect()
    }

    return () => {
      socket.disconnect()
    }
  }, [socket, user])

  if (!user) return <Navigate to={`/${END_POINTS.AUTH.MASTER}`} replace />

  return (
    <PrivateLayout>
      <SocketContext.Provider value={{ socket }}>
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
      </SocketContext.Provider>
    </PrivateLayout>
  )
}
