import { Skeleton } from 'antd'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetConversationsInfiniteQuery } from '../../../../apis'
import { SocketContext } from '../../../../contexts'
import { Conversation as ConversationModel, Message } from '../../../../models'
import { Header } from './Header'
import { Item } from './Item'

type Props = {}

export const ConversationList: React.FC<Props> = () => {
  const [name, setName] = useState<string>()
  const [conversations, setConversations] = useState<ConversationModel[]>([])
  const socket = useContext(SocketContext)
  const [numOfNewConversationsOnSocket, setNumOfNewConversationsOnSocket] =
    useState(0)

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

  const updateConversations = (conversation: ConversationModel) => {
    setConversations(pre => {
      const index = pre.findIndex(item => item.id === conversation.id)
      if (index < 0) {
        setNumOfNewConversationsOnSocket(pre => pre + 1)
        return [conversation, ...pre]
      } else {
        return [
          ...pre.slice(0, index),
          {
            ...pre[index],
            ...conversation,
          },
          ...pre.slice(index + 1, pre.length),
        ]
      }
    })
  }

  useEffect(() => {
    socket.on('onConversation', (conversation: ConversationModel) => {
      updateConversations(conversation)
    })

    socket.on('onMessage', (message: Message) => {
      updateConversations({
        ...message.conversation,
        lastMessage: message,
      })
    })

    return () => {
      socket.off('onConversation')
      socket.off('onMessage')
    }
  }, [socket])

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
  ${tw`flex flex-col gap-3 p-3`};
  height: calc(100vh - 65px);
  overflow-x: hidden;

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
