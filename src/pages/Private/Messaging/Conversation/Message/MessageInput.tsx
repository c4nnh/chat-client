import { LikeFilled } from '@ant-design/icons'
import { Input, InputRef } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { useCreateMessageMutation } from '../../../../../apis'
import { SendIcon } from '../../../../../assets'
import { SocketContext } from '../../../../../contexts'
import { useAuthStore, useSendingMessagesStore } from '../../../../../stores'

type Props = {}

export const MessageInput: React.FC<Props> = () => {
  const { id: conversationId } = useParams()
  const { user } = useAuthStore()
  const { sendingMessages, setSendingMessages } = useSendingMessagesStore()
  const { socket } = useContext(SocketContext)
  const [content, setContent] = useState('')
  const [focused, setFocused] = useState(false)
  const { mutate, isLoading } = useCreateMessageMutation()
  const inputRef = useRef<InputRef>(null)

  const onFocus = () => setFocused(true)

  const onBlur = () => setFocused(false)

  const onSend = (value?: string) => {
    if (isLoading) return

    const currentTime = new Date().getTime()
    setSendingMessages([
      ...sendingMessages,
      {
        id: currentTime,
        content: value || content,
        isSending: true,
        isFailed: false,
      },
    ])
    setContent('')
    mutate(
      {
        content: value || content,
        conversationId: conversationId!,
      },
      {
        onSuccess: data => {
          setSendingMessages(
            sendingMessages.filter(
              item => item.content !== data.content && item.isSending
            )
          )
        },
        onError: (error: any) => {
          const msg = JSON.parse((error.toJSON() as any).config.data).content
          setSendingMessages([
            {
              id: currentTime,
              content: msg,
              isSending: false,
              isFailed: true,
            },
          ])
        },
      }
    )
  }

  useEffect(() => {
    if (!isLoading) {
      inputRef?.current?.focus()
    }
  }, [isLoading])

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
        ref={inputRef}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Aa"
        onKeyUp={event => {
          if (event.key === 'Enter') {
            onSend()
          }
        }}
        disabled={isLoading}
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

  &.ant-input-disabled {
    ${tw`bg-gray-600`}
  }

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
