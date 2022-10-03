import { Skeleton } from 'antd'
import classnames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetMessagesInfiniteQuery } from '../../../../../apis'
import { StyledSpin } from '../../../../../components'
import { SocketContext } from '../../../../../contexts'
import { MessageGroup as MessageGroupModel, User } from '../../../../../models'
import { useAuthStore } from '../../../../../stores'
import {
  addMessageToMessageGroups,
  convertMessagesToMessageGroups,
} from '../../../../../utils'
import { MessageGroup } from './MessageGroup'
import { MessageInput } from './MessageInput'

type Props = {}

export const MessageList: React.FC<Props> = () => {
  const { id: conversationId } = useParams()
  const [typingUsers, setTypingUsers] = useState<User[]>([])
  const [messageGroups, setMessageGroups] = useState<MessageGroupModel[]>([])
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const [isFetchMore, setIsFetchMore] = useState(false)
  const { socket } = useContext(SocketContext)
  const [numOfNewMessagesOnSocket, setNumOfNewMessagesOnSocket] = useState(0)
  const { user } = useAuthStore()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetMessagesInfiniteQuery(
      {
        limit: 40,
        conversationId: conversationId || '',
      },
      {
        enabled: !!conversationId,
        getNextPageParam: (prevPage, pages) => {
          if (pages.length < prevPage.pagination.totalPage) {
            return {
              offset:
                messageGroups?.reduce(
                  (pre, curr) => pre + curr.messages.length,
                  0
                ) || 0 + numOfNewMessagesOnSocket,
            }
          }
          return undefined
        },
      }
    )

  useEffect(() => {
    socket.emit('onJoinConversation', { conversationId })

    socket.on('onNewMessage', (msg: any) => {
      setNumOfNewMessagesOnSocket(pre => pre + 1)
      setMessageGroups(pre => addMessageToMessageGroups(msg, pre))
    })

    socket.on('onUserTyping', (data: any) => {
      if (user?.id !== data.user.id) {
        setTypingUsers(pre => [data.user, ...pre])
      }
    })

    socket.on('onUserStopTyping', (data: any) => {
      setTypingUsers(pre => pre.filter(item => item.id !== data.userId))
    })

    return () => {
      socket.off('onNewMessage')
      socket.off('onUserTyping')
      socket.emit('onLeaveConversation', { conversationId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId])

  useEffect(() => {
    setMessageGroups(
      convertMessagesToMessageGroups(
        data?.pages.map(group => group.data).flat()
      )
    )
  }, [data])

  useEffect(() => {
    if (!isFetchMore) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageGroups])

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target

    const top = scrollTop === clientHeight - scrollHeight

    if (top && hasNextPage) {
      setIsFetchMore(true)
      fetchNextPage()
    } else {
      setIsFetchMore(false)
    }
  }

  return (
    <>
      <Container
        onScroll={handleScroll}
        className={classnames({
          'is-typing': !!typingUsers.length,
        })}
      >
        <div ref={bottomRef} className="flex-1" />
        {isFetching
          ? Array.from(Array(6).keys()).map((_, index) =>
              Array.from(Array(5).keys()).map((item, idx) => (
                <StyledSkeletonInput
                  key={item}
                  className={index % 2 === 0 ? 'justify-end' : ''}
                  width={`${Math.floor((((idx % 3) + 1) * 100) / 7)}%`}
                />
              ))
            )
          : messageGroups?.map((item, index) => (
              <MessageGroup messageGroup={item} key={index} />
            ))}
        {isFetchingNextPage && <StyledSpin />}
      </Container>
      {!!typingUsers.length && <span>Typing</span>}
      {!isFetching && <MessageInput />}
    </>
  )
}

const Container = styled.div`
  ${tw`pt-3 px-3 flex flex-col-reverse overflow-x-hidden`};
  height: calc(100vh - 121px);

  &.is-typing {
    height: calc(100vh - 143px);
  }

  ::-webkit-scrollbar-track {
    ${tw`bg-gray-700 rounded-full`}
  }

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-600 rounded-full`}
  }

  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-gray-500`}
  }
`

const StyledSkeletonInput = styled(Skeleton.Input).attrs({
  active: true,
})<{ width: string }>`
  ${tw`flex`}
  .ant-skeleton-input {
    ${tw`h-4`}
    width: ${props => props.width}
  }
`
