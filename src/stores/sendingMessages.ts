import { SendingMessage } from '../models'
import create from 'zustand'

type SendingMessagesState = {
  sendingMessages: SendingMessage[]
  setSendingMessages: (value: SendingMessage[]) => void
}

export const useSendingMessagesStore = create<SendingMessagesState>()(
  (set, get) => ({
    sendingMessages: [],
    setSendingMessages: value => {
      console.log('here')
      console.log(value)

      set({
        sendingMessages: value,
      })
    },
  })
)
