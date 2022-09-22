import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { Header } from './Header'
import { MessageList } from './MessageList'

type Props = {}

export const Chat: React.FC<Props> = () => {
  return (
    <Container>
      <Header />
      <MessageList />
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex-1 flex flex-col w-80 relative`};
  border-right: 1px solid ${theme`colors.gray.600`};
`
