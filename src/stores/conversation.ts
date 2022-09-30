import { Conversation } from '../models'
import create from 'zustand'

type ConversationState = {
  conversation?: Conversation
  setConversation: (value: Conversation) => void
}

export const useConversationStore = create<ConversationState>()(set => ({
  setConversation: value => {
    set({
      conversation: value,
    })
  },
}))
