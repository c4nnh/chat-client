import { Skeleton } from 'antd'
import { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetConversationsInfiniteQuery } from '../../../../apis'
import { SocketContext } from '../../../../contexts'
import { Conversation as ConversationModel } from '../../../../models'
import { Header } from './Header'
import { Item } from './Item'
import { useAuthStore } from '../../../../stores'

type Props = {}

export const ConversationList: React.FC<Props> = () => {
  const { user } = useAuthStore()
  const [name, setName] = useState<string>()
  const [conversations, setConversations] = useState<ConversationModel[]>([])
  const { socket } = useContext(SocketContext)
  const [numOfNewConversationsOnSocket, setNumOfNewConversationsOnSocket] =
    useState(0)

  const newMessageAudio = new Audio('/assets/music/newMessage.mp3')

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetConversationsInfiniteQuery(
      {
        name,
      },
      {
        getNextPageParam: (prevPage, pages) => {
          if (pages.length < prevPage.pagination.totalPage) {
            return {
              offset: conversations.length + numOfNewConversationsOnSocket,
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
    setConversations((data?.pages || []).map(item => item.data).flat())
  }, [data])

  const updateConversations = useCallback((conversation: ConversationModel) => {
    setConversations(pre => {
      const index = pre.findIndex(item => item.id === conversation.id)
      if (index < 0) {
        setNumOfNewConversationsOnSocket(pre => pre + 1)
        return [conversation, ...pre]
      } else {
        return [
          {
            ...pre[index],
            ...conversation,
          },
          ...pre.slice(0, index),
          ...pre.slice(index + 1),
        ]
      }
    })
  }, [])

  useEffect(() => {
    socket.on('onConversationsUpdate', (conversation: ConversationModel) => {
      updateConversations(conversation)
      if (conversation.lastMessage.creator.id !== user?.id) {
        newMessageAudio.play()
      }
    })

    socket.on(
      'onConversationInformationUpdate',
      (conversation: ConversationModel) => {
        setConversations(pre =>
          pre.map(item => {
            if (item.id === conversation.id) {
              return {
                ...item,
                ...conversation,
              }
            }
            return item
          })
        )
      }
    )

    return () => {
      socket.off('onConversationsUpdate')
      socket.off('onConversationInformationUpdate')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, updateConversations])

  return (
    <Container>
      <Header onSearch={setName} />
      <List onScroll={onScroll}>
        {isFetching
          ? Array.from(Array(10).keys()).map(item => (
              <StyledSkeletonButton key={item} />
            ))
          : conversations.map(item => (
              <Item key={item.id} conversation={item} />
            ))}
        {isFetchingNextPage && <StyledSkeletonButton />}
      </List>
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-80 bg-gray-800 flex flex-col`}
`

const List = styled.div`
  ${tw`flex flex-col gap-3 p-3 overflow-x-hidden`};
  height: calc(100vh - 65px);

  ::-webkit-scrollbar-track {
    ${tw`bg-gray-800 rounded-full`}
  }

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-500 rounded-full`}
  }

  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-gray-400`}
  }
`

const StyledSkeletonButton = styled(Skeleton.Button).attrs({
  active: true,
})`
  .ant-skeleton-button {
    ${tw`w-full h-16 rounded-lg`}
  }
`
