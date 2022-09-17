import { Avatar } from 'antd'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'

type Props = {}

export const Header: React.FC<Props> = () => {
  return (
    <Container>
      <Avatar src="https://joeschmoe.io/api/v1/random" size="large" />
      <Name>Chat name</Name>
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
