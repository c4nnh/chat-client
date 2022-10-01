import { createContext } from 'react'
import { Socket } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | any
}

export const SocketContext = createContext<SocketContextType>({
  socket: undefined,
})
