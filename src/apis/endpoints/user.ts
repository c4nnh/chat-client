import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query'
import { PAGINATION_LIMIT } from '../../constants'
import { Collection, Contact, ContactParams } from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions } from '../type'

type Response = {
  getContacts: Collection<Contact>
}

type QueryKeys = {
  getContacts: ['getContacts', ContactParams]
}

type API = {
  getContacts: QueryFunction<Response['getContacts'], QueryKeys['getContacts']>
}

const CONTACT_PREFIX = 'contacts'

const user: API = {
  getContacts: ({ queryKey: [, params], pageParam }) =>
    request.get(CONTACT_PREFIX, { params: { ...params, ...pageParam } }),
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
          offset: pages.length * PAGINATION_LIMIT,
        }
      }
      return undefined
    },
    ...options,
  })
