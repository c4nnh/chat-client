import { createContext } from 'react'
import { io } from 'socket.io-client'
import { getToken } from '../utils'

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
  extraHeaders: {
    authorization: `Bearer ${getToken().accessToken}`,
  },
})
export const SocketContext = createContext(socket)
