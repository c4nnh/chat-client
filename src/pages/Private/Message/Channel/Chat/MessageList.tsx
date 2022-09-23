import { Skeleton } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetMessagesInfiniteQuery } from '../../../../../apis'
import { StyledSpin } from '../../../../../components/Spin'
import { MessageGroup as MessageGroupModel } from '../../../../../models'
import { MessageGroup } from './MessageGroup'
import { MessageInput } from './MessageInput'

type Props = {}

export const MessageList: React.FC<Props> = () => {
  const { id: conversationId } = useParams()
  const [messageGroups, setMessageGroups] = useState<MessageGroupModel[]>()
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const [isFetchMore, setIsFetchMore] = useState(false)

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetMessagesInfiniteQuery(
    {
      limit: 30,
      conversationId: conversationId || '',
    },
    {
      enabled: !!conversationId,
    }
  )

  useEffect(() => {
    setMessageGroups(
      messages?.pages
        .map(group => group.data)
        .flat()
        .reduce((pre, curr) => {
          if (!pre.length) {
            return [
              {
                creator: curr.creator,
                messages: [curr],
              },
            ]
          }
          const lastGroup = pre[pre.length - 1]
          if (lastGroup.creator.id === curr.creator.id) {
            return [
              ...pre.slice(0, pre.length - 1),
              {
                ...lastGroup,
                messages: [...lastGroup.messages, curr],
              },
            ]
          }
          return [
            ...pre,
            {
              creator: curr.creator,
              messages: [curr],
            },
          ]
        }, [] as MessageGroupModel[])
    )
  }, [messages])

  useEffect(() => {
    if (!isFetchMore) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setIsFetchMore(false)
    }
  }, [isFetchMore, messageGroups])

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target

    const top = scrollTop === clientHeight - scrollHeight

    if (top && hasNextPage) {
      setIsFetchMore(true)
      fetchNextPage()
    }
  }

  return (
    <>
      <Container onScroll={handleScroll}>
        <div ref={bottomRef} />
        {messageGroups?.map((item, index) => (
          <MessageGroup messageGroup={item} key={index} />
        ))}
        {isFetchingNextPage && <StyledSpin />}
        {isFetching &&
          Array.from(Array(6).keys()).map((_, index) =>
            Array.from(Array(5).keys()).map((item, idx) => (
              <StyledSkeletonInput
                key={item}
                className={index % 2 === 0 ? 'justify-end' : ''}
                width={`${Math.floor((((idx % 3) + 1) * 100) / 7)}%`}
              />
            ))
          )}
      </Container>
      {!isFetching && <MessageInput />}
    </>
  )
}

const Container = styled.div`
  ${tw`gap-3 p-3 flex flex-col-reverse`};
  height: calc(100vh - 121px);
  overflow-x: hidden;

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

type P = {
  width: string
}

const StyledSkeletonInput = styled(Skeleton.Input).attrs({
  active: true,
})<{ width: string }>`
  ${tw`flex`}
  .ant-skeleton-input {
    ${tw`h-4`}
    width: ${props => props.width}
  }
`
