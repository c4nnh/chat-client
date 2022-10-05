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
  Contact,
  ContactParams,
  UpdateUserDto,
  User,
} from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions, MutationOptions, QueryOptions } from '../type'

type Response = {
  me: User
  getContacts: Collection<Contact>
  update: User
}

type QueryKeys = {
  getContacts: ['getContacts', ContactParams]
  me: ['me']
}

type Variables = {
  update: UpdateUserDto
}

type API = {
  getContacts: QueryFunction<Response['getContacts'], QueryKeys['getContacts']>
  me: QueryFunction<Response['me'], QueryKeys['me']>
  update: MutationFunction<Response['update'], Variables['update']>
}

const CONTACT_PREFIX = 'contacts'
const ME_PREFIX = 'me'

const user: API = {
  getContacts: ({ queryKey: [, params], pageParam }) =>
    request.get(CONTACT_PREFIX, { params: { ...params, ...pageParam } }),
  me: () => request.get(ME_PREFIX),
  update: data => request.put(ME_PREFIX, data),
}

export const useGetContactsInfiniteQuery = (
  params: ContactParams,
  options?: InfiniteQueryOptions<
    Response['getContacts'],
    QueryKeys['getContacts']
  >
) =>
  useInfiniteQuery(['getContacts', params], user.getContacts, {
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

export const useMeQuery = (
  options?: QueryOptions<Response['me'], QueryKeys['me']>
) => useQuery(['me'], user.me, options)

export const useUpdateUserMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => useMutation(['update'], user.update, options)
