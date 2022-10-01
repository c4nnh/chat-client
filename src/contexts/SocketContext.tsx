import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'
import { getToken } from '../utils'

type SocketContextType = {
  socket: Socket
}

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
  extraHeaders: {
    authorization: `Bearer ${getToken().accessToken}`,
  },
  reconnectionAttempts: 3,
  autoConnect: false,
})

export const SocketContext = createContext<SocketContextType>({ socket })
