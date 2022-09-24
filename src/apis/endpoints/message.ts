import {
  MutationFunction,
  QueryFunction,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query'
import { PAGINATION_LIMIT } from '../../constants'
import {
  Collection,
  CreateMessageDto,
  Message,
  MessagesParams,
} from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions, MutationOptions } from '../type'

type Response = {
  get: Collection<Message>
  create: Message
}

type QueryKeys = {
  get: ['getMessages', MessagesParams]
}

type Variables = {
  create: CreateMessageDto
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
  create: MutationFunction<Response['create'], Variables['create']>
}

const PREFIX = 'messages'

const message: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, ...pageParam } }),
  create: data => request.post(PREFIX, data),
}

export const useGetMessagesInfiniteQuery = (
  params: MessagesParams,
  options?: InfiniteQueryOptions<Response['get'], QueryKeys['get']>
) =>
  useInfiniteQuery(['getMessages', params], message.get, {
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

export const useCreateMessageMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => useMutation(['create'], message.create, options)
