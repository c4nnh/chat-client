import { Avatar } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Conversation } from '../../../../models'

type Props = {
  conversation: Conversation
}

export const Item: React.FC<Props> = ({ conversation }) => {
  return (
    <Container>
      <Avatar src={conversation.image} />
      {conversation.title}
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex gap-2`}
`
