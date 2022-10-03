import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useGetRoomDetailQuery } from '../../../../apis'
import { END_POINTS } from '../../../../constants'
import { SocketContext } from '../../../../contexts'
import { RoomMember, RoomRole } from '../../../../models'

export const BunnyJumpDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { socket } = useContext(SocketContext)

  const [members, setMembers] = useState<RoomMember[]>([])

  const { isFetching } = useGetRoomDetailQuery(id!, {
    enabled: !!id,
    onSuccess: res => setMembers(res.members),
    onError: () =>
      navigate(
        `/${END_POINTS.PRIVATE.GAME.MASTER}/${END_POINTS.PRIVATE.GAME.BUNNY_JUMP}`
      ),
  })

  useEffect(() => {
    if (id) {
      socket.emit('joinRoom', { rommId: id })

      socket.on('onUserJoinRoom', (newMember: RoomMember) => {
        setMembers(pre => [...pre, newMember])
      })

      socket.on(
        'onUserLeaveRoom',
        (data: { userId: string; newCreatorId: string }) => {
          const { userId, newCreatorId } = data
          setMembers(pre => {
            const filtered = pre.filter(item => item.id !== userId)
            const index = filtered.findIndex(item => item.id === newCreatorId)
            if (index > -1) {
              return [
                ...filtered.slice(0, index),
                { ...filtered[index], role: RoomRole.CREATOR },
                ...filtered.slice(index + 1),
              ]
            }
            return filtered
          })
        }
      )
    }

    return () => {
      socket.off('joinRoom')
      socket.off('onUserJoinRoom')
      socket.off('onUserLeaveRoom')
      socket.emit('leaveRoom', { roomId: id })
    }
  }, [socket, id])

  if (isFetching) {
    return <span>Loading</span>
  }

  return (
    <Container>
      {members.map(item => (
        <span key={item.id}>
          {item.name}:{item.role}
        </span>
      ))}
    </Container>
  )
}

const Container = styled.div``
