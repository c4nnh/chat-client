import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query'
import { PAGINATION_LIMIT } from '../../constants'
import { Collection, Conversation, ConversationParams } from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions } from '../type'

type Response = {
  get: Collection<Conversation>
}

type QueryKeys = {
  get: ['getConversations', ConversationParams]
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
}

const PREFIX = 'conversations'

const conversation: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, pageParam } }),
}

export const useGetConversationsInfiniteQuery = (
  params: ConversationParams,
  options?: InfiniteQueryOptions<Response['get'], QueryKeys['get']>
) =>
  useInfiniteQuery(['getConversations', params], conversation.get, {
    getNextPageParam: (prevPage, pages) => {
      if (pages.length < prevPage.pagination.totalPage) {
        return {
          offset: pages.length * PAGINATION_LIMIT,
        }
      }
      return undefined
    },
    ...options,
  })
