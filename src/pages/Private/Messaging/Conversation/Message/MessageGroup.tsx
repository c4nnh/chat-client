import { Avatar } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import { MessageGroup as MessageGroupModel } from '../../../../../models'
import { useAuthStore } from '../../../../../stores'
import classnames from 'classnames'

type Props = {
  messageGroup: MessageGroupModel
}

export const MessageGroup: React.FC<Props> = ({ messageGroup }) => {
  const { user } = useAuthStore()

  const isYourMessage = messageGroup.creator.id === user?.id

  return (
    <Container
      className={classnames({
        'is-your': isYourMessage,
      })}
    >
      {!isYourMessage && (
        <AvatarContainer>
          <Avatar src={messageGroup.creator.image} />
        </AvatarContainer>
      )}
      <MessageContainer
        className={classnames({
          'is-your': isYourMessage,
        })}
      >
        {!isYourMessage && (
          <MessageTitleContainer>
            <span className="text-gray-400">{messageGroup.creator.name}</span>
            <span className="text-gray-500">
              {messageGroup.messages[0].createdAt.toString()}
            </span>
          </MessageTitleContainer>
        )}
        <ListMessages
          className={classnames({
            'is-your': isYourMessage,
          })}
        >
          {messageGroup.messages.map(item => (
            <MessageContent
              className={classnames({
                'is-your': isYourMessage,
              })}
              key={item.id}
            >
              {item.content}
            </MessageContent>
          ))}
        </ListMessages>
      </MessageContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex gap-2`}
  &.is-your {
    ${tw`justify-end`}
  }
`

const AvatarContainer = styled.div`
  ${tw`h-full flex`}
`

const MessageContainer = styled.div`
  ${tw`flex flex-col`};

  &.is-your {
    ${tw`items-end`}
  }
`

const ListMessages = styled.div`
  ${tw`flex flex-col-reverse gap-1`};

  &.is-your {
    ${tw`items-end`}

    span:last-child {
      ${tw`rounded-tr-3xl`}
    }

    span:first-child {
      ${tw`rounded-br-3xl`}
    }
  }

  :not(&.is-your) {
    span:last-child {
      ${tw`rounded-tl-3xl`}
    }

    span:first-child {
      ${tw`rounded-bl-3xl`}
    }
  }
`

const MessageTitleContainer = styled.div`
  ${tw`flex gap-2 items-center`}
`

const MessageContent = styled.span`
  width: fit-content;
  max-width: 400px;
  word-break: break-all;
  ${tw`text-gray-300 flex bg-gray-600 px-[10px] py-[2px] rounded`}

  &.is-your {
    ${tw`rounded-l-3xl`}
  }

  :not(&.is-your) {
    ${tw`rounded-r-3xl`}
  }
`
