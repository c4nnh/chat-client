import { LikeFilled } from '@ant-design/icons'
import { Input } from 'antd'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'

type Props = {}

export const MessageInput: React.FC<Props> = () => {
  return (
    <Container>
      <StyledInput />
      <StyledLikeIcon />
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-14 w-full flex items-center gap-2 px-2`};
`

const StyledInput = styled(Input)`
  ${tw`bg-gray-600 rounded-full`};

  border: none;

  .ant-input {
    ${tw`bg-gray-700 text-gray-300 h-9`}

    ::placeholder {
      ${tw`text-gray-300`}
    }
  }

  :focus {
    border-color: ${theme`colors.gray.700`};
  }

  .ant-input-clear-icon {
    ${tw`text-gray-300`}
  }
`

const StyledLikeIcon = styled(LikeFilled)`
  ${tw`text-3xl text-gray-400 cursor-pointer`}
`
