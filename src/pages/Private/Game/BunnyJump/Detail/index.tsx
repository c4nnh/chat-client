import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetRoomDetailQuery } from '../../../../../apis'
import { Loading } from '../../../../../components'
import { END_POINTS } from '../../../../../constants'
import { SocketContext } from '../../../../../contexts'
import { RoomMember, RoomRole } from '../../../../../models'
import { Footer } from './Footer'
import { Members } from './Members'

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
      socket.emit('joinRoom', { roomId: id })

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
    return <Loading />
  }

  return (
    <Container>
      <Members members={members} />
      <div className="flex-1 w-full bg-gray-400">body</div>
      <Footer members={members} />
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-full flex flex-col gap-4 p-4`}
`
