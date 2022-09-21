import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { ErrorResponse } from '../models'

export type QueryOptions<
  TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TError = ErrorResponse,
  TData = TQueryFnData
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>

export type InfiniteQueryOptions<
  TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TError = unknown,
  TData = TQueryFnData
> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
  'queryKey' | 'queryFn'
>

export type MutationOptions<
  TData = unknown,
  TVariables = void,
  TError = ErrorResponse,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationKey' | 'mutationFn'
>
