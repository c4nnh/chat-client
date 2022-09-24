import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Channel } from './Conversation'
import { ChannelWelcome } from './Conversation/Welcome'
import { Conversation } from './ConversationList'

type Props = {}

export const Message: React.FC<Props> = () => {
  return (
    <Container>
      <Conversation />
      <Routes>
        <Route path="" element={<ChannelWelcome />} />
        <Route path=":id" element={<Channel />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  ${tw`bg-gray-500 flex-1 flex`}
`
