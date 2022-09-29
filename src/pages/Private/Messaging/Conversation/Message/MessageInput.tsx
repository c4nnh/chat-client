import { LikeFilled } from '@ant-design/icons'
import { Input } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { useCreateMessageMutation } from '../../../../../apis'
import { SendIcon } from '../../../../../assets'

type Props = {}

export const MessageInput: React.FC<Props> = () => {
  const [content, setContent] = useState('')
  const { id: conversationId } = useParams()
  const { mutate } = useCreateMessageMutation()

  const onSend = (value?: string) => {
    mutate(
      {
        content: value || content,
        conversationId: conversationId!,
      },
      {
        onSuccess: () => setContent(''),
      }
    )
  }

  return (
    <Container>
      <StyledInput
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Aa"
        onKeyUp={event => {
          if (event.key === 'Enter') {
            onSend()
          }
        }}
      />
      {!!content ? (
        <StyledSendIcon onClick={() => onSend()} />
      ) : (
        <StyledLikeIcon onClick={() => onSend('👍')} />
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-14 w-full flex items-center gap-2 px-2`};
`

const StyledInput = styled(Input)`
  ${tw`bg-gray-600 rounded-full text-gray-300`};

  border: none;

  .ant-input {
    ${tw`bg-gray-600 text-gray-300 h-9`}

    ::placeholder {
      ${tw`text-gray-300`}
    }
  }

  :focus {
    border-color: ${theme`colors.gray.700`};
  }
`

const StyledLikeIcon = styled(LikeFilled)`
  ${tw`text-3xl text-gray-400 cursor-pointer`}
`

const StyledSendIcon = styled(SendIcon)`
  ${tw`text-3xl text-gray-400 cursor-pointer`}
`
