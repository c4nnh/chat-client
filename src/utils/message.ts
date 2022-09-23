import { Message, MessageGroup } from '../models'

export const convertMessagesToMessageGroups = (
  messages?: Message[]
): MessageGroup[] => {
  if (!messages || !messages.length) return []

  return messages.reduce((pre, curr) => {
    if (!pre.length) {
      return [
        {
          creator: curr.creator,
          messages: [curr],
        },
      ]
    }
    const lastGroup = pre[pre.length - 1]
    if (lastGroup.creator.id === curr.creator.id) {
      return [
        ...pre.slice(0, pre.length - 1),
        {
          ...lastGroup,
          messages: [...lastGroup.messages, curr],
        },
      ]
    }
    return [
      ...pre,
      {
        creator: curr.creator,
        messages: [curr],
      },
    ]
  }, [] as MessageGroup[])
}

export const addMessageToMessageGroups = (
  message: Message,
  messageGroups: MessageGroup[]
): MessageGroup[] => {
  const [firstGroup, ...rest] = messageGroups
  if (firstGroup.creator.id === message.creator.id) {
    return [
      {
        ...firstGroup,
        messages: [message, ...firstGroup.messages],
      },
      ...rest,
    ]
  }
  return [
    {
      creator: message.creator,
      messages: [message],
    },
    ...messageGroups,
  ]
}
