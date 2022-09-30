import { Avatar } from 'antd'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { useConversationStore } from '../../../../../stores'

type Props = {}

export const Header: React.FC<Props> = () => {
  const { conversation } = useConversationStore()

  document.title = `Chat: ${conversation?.name || ''}`

  return (
    <Container>
      <Avatar src={conversation?.image} size="large" />
      <Name>{conversation?.name}</Name>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-[65px] w-full px-3 py-1 gap-2 flex items-center cursor-pointer`};
  border-bottom: 1px solid ${theme`colors.gray.600`};
`

const Name = styled.span`
  ${tw`text-gray-300 text-lg font-medium`}
`
