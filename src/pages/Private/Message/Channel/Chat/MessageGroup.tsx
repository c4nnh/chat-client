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
        <ListMessages>
          {messageGroup.messages.map(item => (
            <span className="text-gray-300" key={item.id}>
              {item.content}
            </span>
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
  ${tw`flex flex-col-reverse`}
`

const MessageTitleContainer = styled.div`
  ${tw`flex gap-2 items-center`}
`
