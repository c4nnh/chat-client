import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query'
import { PAGINATION_LIMIT } from '../../constants'
import { Collection, Message, MessagesParams } from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions } from '../type'

type Response = {
  get: Collection<Message>
}

type QueryKeys = {
  get: ['getMessages', MessagesParams]
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
}

const PREFIX = 'messages'

const message: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, ...pageParam } }),
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
