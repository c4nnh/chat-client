import { LikeFilled } from '@ant-design/icons'
import { Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { useCreateMessageMutation } from '../../../../../apis'
import { SendIcon } from '../../../../../assets'
import { SocketContext } from '../../../../../contexts'
import { useAuthStore } from '../../../../../stores'

type Props = {}

export const MessageInput: React.FC<Props> = () => {
  const [content, setContent] = useState('')
  const { id: conversationId } = useParams()
  const { mutate } = useCreateMessageMutation()
  const { user } = useAuthStore()
  const socket = useContext(SocketContext)
  const [focused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)

  const onBlur = () => setFocused(false)

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

  useEffect(() => {
    if (focused && !!content) {
      socket.emit('onTypingStart', {
        conversationId,
        user: { id: user?.id, name: user?.name },
      })
    } else {
      socket.emit('onTypingStop', {
        conversationId,
        userId: user?.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, content])

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
        onFocus={onFocus}
        onBlur={onBlur}
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
