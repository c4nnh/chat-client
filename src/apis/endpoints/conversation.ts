import {
  MutationFunction,
  QueryFunction,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query'
import { PAGINATION_LIMIT } from '../../constants'
import {
  Collection,
  Conversation,
  ConversationParams,
  CreateConversationDto,
} from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions, MutationOptions } from '../type'

type Response = {
  get: Collection<Conversation>
  create: Conversation
}

type QueryKeys = {
  get: ['getConversations', ConversationParams]
}

type Variables = {
  create: CreateConversationDto
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
  create: MutationFunction<Response['create'], Variables['create']>
}

const PREFIX = 'conversations'

const conversation: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, pageParam } }),
  create: data => request.post(PREFIX, data),
}

export const useGetConversationsInfiniteQuery = (
  params: ConversationParams,
  options?: InfiniteQueryOptions<Response['get'], QueryKeys['get']>
) =>
  useInfiniteQuery(['getConversations', params], conversation.get, {
    getNextPageParam: (prevPage, pages) => {
      if (pages.length < prevPage.pagination.totalPage) {
        return {
          offset: pages.length * (params.limit || PAGINATION_LIMIT),
        }
      }
      return undefined
    },
    ...options,
  })

export const useCreateConversationMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => useMutation(['create'], conversation.create, options)
