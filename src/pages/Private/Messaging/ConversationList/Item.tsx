import { Avatar, Typography } from 'antd'
import classnames from 'classnames'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Conversation } from '../../../../models'
import { useAuthStore, useConversationStore } from '../../../../stores'

type Props = {
  conversation: Conversation
}

export const Item: React.FC<Props> = ({ conversation }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const { setConversation } = useConversationStore()

  const isYourMessage = conversation.lastMessage?.creator?.id === user?.id

  const isSelected = location.pathname.split('/').pop() === conversation.id

  useEffect(() => {
    if (isSelected) {
      setConversation(conversation)
    }
  }, [conversation, isSelected, setConversation])

  return (
    <Container
      onClick={() => {
        navigate(conversation.id)
        setConversation(conversation)
      }}
      className={classnames({
        selected: isSelected,
      })}
    >
      <Avatar src={conversation.image} size="large" />
      <div className="flex flex-1 gap-1 justify-between items-center">
        <Title>
          <span
            className={classnames({
              'text-gray-400': true,
              'font-semibold': true,
              unread: !true && !isYourMessage,
            })}
          >
            {conversation.name}
          </span>
          <Typography.Text
            className={classnames({
              'text-gray-400': true,
              'font-light': true,
              unread: !true && !isYourMessage,
            })}
            style={{ width: 200 }}
            ellipsis
          >
            {conversation.lastMessage?.creator?.id === user?.id ? `You: ` : ''}
            {conversation.lastMessage?.content}
          </Typography.Text>
        </Title>
        {/* {isYourMessage ? (
          <CheckCircleFilled className="text-gray-500" />
        ) : isRead ? (
          <Avatar.Group>
            {conversation.lastMessage.readBy.slice(0, 2).map(item => (
              <Avatar key={item.id} src={item.image} className="h-4 w-4" />
            ))}
          </Avatar.Group>
        ) : (
          <span className="h-2 w-2 rounded-full bg-white"></span>
        )} */}
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex gap-2 py-3 cursor-pointer px-2 rounded-lg items-center`};

  transition: background-color 0.5s;
  :hover {
    ${tw`bg-gray-700`}
  }

  &.selected {
    ${tw`bg-gray-700`}
  }
`

const Title = styled.div`
  ${tw`flex flex-col gap-1`};
  .unread {
    ${tw`text-white`}
  }
`
