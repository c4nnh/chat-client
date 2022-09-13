import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useAuthStore } from '../../../../stores'
import { Header } from './Header'
import { Item } from './Item'

type Props = {}

export const Conversation: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState<string>()

  const { user } = useAuthStore()

  return (
    <Container>
      <Header onSearch={setSearchText} />
      <List>
        {Array.from(Array(50).keys()).map((_, index) => (
          <Item
            key={index}
            conversation={{
              id: `${index}`,
              image: 'https://joeschmoe.io/api/v1/random',
              title: 'abcd',
              lastMessage: {
                id: 'lastMessage',
                content: 'Hello world hahahahahahahahhahahahahahahahahah',
                sender: {
                  id: index % 2 === 0 ? user?.id || '' : 'sender',
                  name: 'sender',
                },
                createdAt: new Date(),
                readBy: Array.from(Array(index % 3).keys()).map((_, idx) => ({
                  id: `${idx}`,
                  image: 'https://joeschmoe.io/api/v1/random',
                })),
              },
            }}
          />
        ))}
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
    ${tw`bg-gray-700`}
  }

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-500 rounded-full`}
  }

  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-gray-400`}
  }
`
