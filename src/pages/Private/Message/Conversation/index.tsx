import styled from 'styled-components'
import tw from 'twin.macro'
import { Header } from './Header'
import { Item } from './Item'

type Props = {}

export const Conversation: React.FC<Props> = () => {
  return (
    <Container>
      <Header />
      <List>
        {Array.from(Array(50).keys()).map((_, index) => (
          <Item
            key={index}
            conversation={{
              id: `${index}`,
              image: 'https://joeschmoe.io/api/v1/random',
              title: 'abcd',
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
  ${tw`flex flex-col gap-3 px-3`};
  height: calc(100vh - 65px);
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    ${tw`bg-gray-800`}
  }

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-700 rounded-full`}
  }

  ::-webkit-scrollbar-thumb:hover {
    ${tw`bg-gray-600`}
  }
`
