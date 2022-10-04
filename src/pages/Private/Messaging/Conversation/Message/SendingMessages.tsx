import { ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useCreateMessageMutation } from '../../../../../apis'
import { SendingMessage } from '../../../../../models'
import { useSendingMessagesStore } from '../../../../../stores'

type Props = {}

export const SendingMessages: React.FC<Props> = () => {
  const { sendingMessages, setSendingMessages } = useSendingMessagesStore()
  const { id: conversationId } = useParams()

  const { mutate } = useCreateMessageMutation()

  const resend = (message: SendingMessage) => {
    const { id, content } = message
    const index = sendingMessages.findIndex(item => item.id === id)
    if (index < 0) return
    setSendingMessages([
      ...sendingMessages.slice(0, index),
      {
        ...sendingMessages[index],
        isFailed: false,
        isSending: true,
      },
      ...sendingMessages.slice(index + 1),
    ])
    mutate(
      {
        content,
        conversationId: conversationId!,
      },
      {
        onSuccess: () =>
          setSendingMessages(sendingMessages.filter(item => item.id !== id)),
        onError: () => {
          setSendingMessages([
            ...sendingMessages.slice(0, index),
            {
              ...sendingMessages[index],
              isFailed: true,
              isSending: false,
            },
            ...sendingMessages.slice(index + 1),
          ])
        },
      }
    )
  }

  return (
    <Container>
      {sendingMessages.map((message, index) => (
        <div key={index} className="flex gap-2 items-center">
          <MessageContent>{message.content}</MessageContent>
          {message.isSending && !message.isFailed && (
            <SyncOutlined spin className="text-gray-300" />
          )}
          {message.isFailed && !message.isSending && (
            <>
              <ExclamationCircleOutlined className="text-red-500" />
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => resend(message)}
              >
                Resend
              </span>
            </>
          )}
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-col-reverse gap-1 items-end mt-1`};

  span:last-child {
    ${tw`rounded-tr-3xl`}
  }

  span:first-child {
    ${tw`rounded-br-3xl`}
  }
`

const MessageContent = styled.span`
  width: fit-content;
  max-width: 400px;
  word-break: break-all;
  ${tw`text-gray-100 flex bg-gray-600 px-[10px] py-[2px] rounded rounded-l-3xl`}
`
