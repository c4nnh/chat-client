import { MessageOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {}

export const Header: React.FC<Props> = () => {
  return (
    <Container>
      <MessageOutlined className="text-2xl text-red-500" />
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-12 flex items-center gap-2 px-5 py-2`}
`
