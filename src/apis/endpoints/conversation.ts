import {
  MutationFunction,
  QueryFunction,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { PAGINATION_LIMIT } from '../../constants'
import {
  Collection,
  Conversation,
  ConversationParams,
  CreateConversationDto,
  UpdateConversationDto,
} from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions, MutationOptions, QueryOptions } from '../type'

type Response = {
  get: Collection<Conversation>
  getOne: Omit<Conversation, 'lastMessage'>
  create: Conversation
  update: Conversation
}

type QueryKeys = {
  get: ['getConversations', ConversationParams]
  getOne: ['getConversationDetail', string]
}

type Variables = {
  create: CreateConversationDto
  update: { id: string; dto: UpdateConversationDto }
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
  getOne: QueryFunction<Response['getOne'], QueryKeys['getOne']>
  create: MutationFunction<Response['create'], Variables['create']>
  update: MutationFunction<Response['update'], Variables['update']>
}

const PREFIX = 'conversations'

const conversation: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, pageParam } }),
  getOne: ({ queryKey: [, id] }) => request.get(`${PREFIX}/${id}`),
  create: data => request.post(PREFIX, data),
  update: ({ id, dto }) => request.put(`${PREFIX}/${id}`, dto),
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

export const useGetConversationDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getOne'], QueryKeys['getOne']>
) => useQuery(['getConversationDetail', id], conversation.getOne, options)

export const useCreateConversationMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => useMutation(['create'], conversation.create, options)

export const useUpdateConversationMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => useMutation(['update'], conversation.update, options)
