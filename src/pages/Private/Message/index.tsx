import styled from 'styled-components'
import tw from 'twin.macro'
import { Channel } from './Channel'
import { Conversation } from './Conversation'

type Props = {}

export const Message: React.FC<Props> = () => {
  return (
    <Container>
      <Conversation />
      <Channel />
    </Container>
  )
}

const Container = styled.div`
  ${tw`bg-gray-500 flex-1 flex`}
`
