import { Conversation, UpdateConversationDto } from '../models'
import create from 'zustand'

type ConversationState = {
  conversation?: Conversation
  setConversation: (value: Conversation) => void
  updateConversation: (value: UpdateConversationDto) => void
}

export const useConversationStore = create<ConversationState>()((set, get) => ({
  setConversation: value => {
    set({
      conversation: value,
    })
  },
  updateConversation: dto => {
    set({
      conversation: {
        ...get().conversation!,
        ...dto,
      },
    })
  },
}))
