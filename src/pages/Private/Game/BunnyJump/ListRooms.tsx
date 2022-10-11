import { Skeleton } from 'antd'
import { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetRoomsInfiniteQuery } from '../../../../apis'
import { StyledSpin, CreateCard } from '../../../../components'
import { SocketContext } from '../../../../contexts'
import { useScreen } from '../../../../hooks'
import { GameType, Room } from '../../../../models'
import { CreateRoom } from './CreateRoom'
import { RoomItem } from './RoomItem'

type Props = {}

export const ListRoom: React.FC<Props> = () => {
  const { isMobileScreen } = useScreen()
  const { socket } = useContext(SocketContext)
  const [rooms, setRooms] = useState<Room[]>([])
  const [numOfNewRoomsOnSocket, setNumOfNewRoomsOnSocket] = useState(0)
  const [openCreateRoom, setOpenCreateRoom] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetRoomsInfiniteQuery(
      { game: GameType.BUNNY_JUMP, limit: 80 },
      {
        getNextPageParam: (prevPage, pages) => {
          if (pages.length < prevPage.pagination.totalPage) {
            return {
              offset: rooms.length + numOfNewRoomsOnSocket,
            }
          }
          return undefined
        },
      }
    )

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement
    const { scrollTop, offsetHeight, scrollHeight } = target
    const bottom = Math.ceil(scrollTop + offsetHeight) === scrollHeight
    if (bottom && hasNextPage) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    setRooms((data?.pages || []).map(item => item.data).flat())
  }, [data])

  const updateNumberOfMember = useCallback(
    (roomId: string, changeValue: number) => {
      setRooms(pre => {
        const index = pre.findIndex(item => item.id === roomId)
        if (index > -1) {
          return [
            ...pre.slice(0, index),
            {
              ...pre[index],
              numberOfMember: pre[index].numberOfMember + changeValue,
            },
            ...pre.slice(index + 1),
          ]
        }
        return pre
      })
    },
    []
  )

  useEffect(() => {
    socket.emit('joinWaitingRoom')

    socket.on('onNewRoom', (room: Room) => {
      if (room.game === GameType.BUNNY_JUMP) {
        setRooms(pre => [room, ...pre])
        setNumOfNewRoomsOnSocket(pre => pre + 1)
      }
    })

    socket.on('onDeleteRoom', (data: { roomId: string }) => {
      const { roomId } = data
      setRooms(pre => {
        const newList = pre.filter(item => item.id !== roomId)
        if (newList.length < pre.length) {
          setNumOfNewRoomsOnSocket(pre => pre - 1)
        }
        return newList
      })
    })

    socket.on('onUserJoinRoom', (roomId: string) => {
      updateNumberOfMember(roomId, 1)
    })

    socket.on('onUserLeaveRoom', (data: { roomId: string }) => {
      const { roomId } = data
      updateNumberOfMember(roomId, -1)
    })

    return () => {
      socket.off('onNewRoom')
      socket.off('onDeleteRoom')
      socket.off('onUserJoinRoom')
      socket.off('onUserLeaveRoom')
      socket.emit('leaveWaitingRoom')
    }
  }, [socket, updateNumberOfMember])

  return (
    <Container onScroll={onScroll}>
      <Body
        style={{
          gridTemplateColumns: `repeat(auto-fill, 180px)`,
          rowGap: isMobileScreen ? '20px' : '40px',
        }}
      >
        {!isFetching && <CreateCard onClick={() => setOpenCreateRoom(true)} />}
        {isFetching
          ? Array.from(Array(25).keys()).map(item => (
              <StyledSkeletonButton key={item} />
            ))
          : rooms.map(item => <RoomItem key={item.id} room={item} />)}
      </Body>
      {isFetchingNextPage && <StyledSpin />}
      <CreateRoom
        open={openCreateRoom}
        onClose={() => setOpenCreateRoom(false)}
      />
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-col gap-8 px-40 pt-20 pb-6 cursor-pointer h-screen overflow-x-hidden`}

  ::-webkit-scrollbar-track {
    ${tw`bg-gray-500 rounded-full`}
  }

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-400 rounded-full`}
  }

  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-gray-300`}
  }
`

const Body = styled.div`
  ${tw`grid justify-evenly gap-x-5`}
`

const StyledSkeletonButton = styled(Skeleton.Button).attrs({
  active: true,
})`
  ${tw`w-[180px] h-[180px]`}

  .ant-skeleton-button {
    ${tw`w-full h-full rounded-lg`}
  }
`
