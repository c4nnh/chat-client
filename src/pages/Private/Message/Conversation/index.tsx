import { Skeleton } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useGetConversationsInfiniteQuery } from '../../../../apis'
import { PAGINATION_LIMIT } from '../../../../constants'
import { Header } from './Header'
import { Item } from './Item'

type Props = {}

export const Conversation: React.FC<Props> = () => {
  const [name, setName] = useState<string>()

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetConversationsInfiniteQuery({
      name,
      limit: PAGINATION_LIMIT,
    })

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement
    const { scrollTop, offsetHeight, scrollHeight } = target
    const bottom = Math.ceil(scrollTop + offsetHeight) === scrollHeight
    if (bottom && hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <Container>
      <Header onSearch={setName} />
      <List onScroll={onScroll}>
        {isFetching &&
          Array.from(Array(10).keys()).map(item => (
            <StyledSkeletonButton key={item} />
          ))}
        {data?.pages.map(group =>
          group.data.map(item => <Item key={item.id} conversation={item} />)
        )}
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

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    ${tw`bg-gray-800`}
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
