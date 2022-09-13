import { PlusOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'

type Props = {}

export const Header: React.FC<Props> = () => {
  return (
    <Container>
      <StyledInput placeholder="Search conversation" />
      <PlusOutlined className="text-gray-500 cursor-pointer" />
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-[65px] flex gap-2 p-3 items-center justify-center`};
  border-bottom: 1px solid ${theme`colors.gray.700`};
`

const StyledInput = styled(Input)`
  ${tw`bg-gray-700 text-gray-300`};

  border: none;

  ::placeholder {
    ${tw`text-gray-300`}
  }

  :focus {
    border-color: ${theme`colors.gray.700`};
  }
`
