import styled from 'styled-components'
import tw from 'twin.macro'
import { Chat } from './Message'
import { Setting } from './Setting'

type Props = {}

export const Channel: React.FC<Props> = () => {
  return (
    <Container>
      <Chat />
      <Setting />
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex-1 flex bg-gray-700`}
`
