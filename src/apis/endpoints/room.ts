import {
  MutationFunction,
  QueryFunction,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import {
  Collection,
  CreateRoomDto,
  JoinRoomDto,
  KickMemberDto,
  Room,
  RoomDetail,
  RoomsParams,
} from '../../models'
import { request } from '../request'
import { InfiniteQueryOptions, MutationOptions, QueryOptions } from '../type'

type Response = {
  get: Collection<Room>
  getOne: RoomDetail
  create: RoomDetail
  join: RoomDetail
  kick: boolean
  updateReadyStatus: boolean
}

type QueryKeys = {
  get: ['getRooms', RoomsParams]
  getOne: ['getRoomDetail', string]
}

type Variables = {
  create: CreateRoomDto
  join: { roomId: string; dto: JoinRoomDto }
  kick: KickMemberDto
  ready: { roomId: string }
  updateReadyStatus: { isReady: false }
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
  getOne: QueryFunction<Response['getOne'], QueryKeys['getOne']>
  create: MutationFunction<Response['create'], Variables['create']>
  join: MutationFunction<Response['join'], Variables['join']>
  kick: MutationFunction<Response['kick'], Variables['kick']>
  updateReadyStatus: MutationFunction<
    Response['updateReadyStatus'],
    Variables['updateReadyStatus']
  >
}

const PREFIX = 'rooms'
const JOIN_ROOM_PREFIX = 'join-room'
const KICK_MEMBER_PREFIX = 'kick-member'
const UPDATE_READY_STATUS = 'update-ready-status'

const room: API = {
  get: ({ queryKey: [, params], pageParam }) =>
    request.get(PREFIX, { params: { ...params, pageParam } }),
  getOne: ({ queryKey: [, id] }) => request.get(`${PREFIX}/${id}`),
  create: dto => request.post(PREFIX, dto),
  join: ({ roomId, dto }) => request.put(`${JOIN_ROOM_PREFIX}/${roomId}`, dto),
  kick: dto => request.put(KICK_MEMBER_PREFIX, dto),
  updateReadyStatus: dto => request.put(UPDATE_READY_STATUS, dto),
}

export const useGetRoomsInfiniteQuery = (
  params: RoomsParams,
  options?: InfiniteQueryOptions<Response['get'], QueryKeys['get']>
) => useInfiniteQuery(['getRooms', params], room.get, options)

export const useGetRoomDetailQuery = (
  id: string,
  options?: QueryOptions<Response['getOne'], QueryKeys['getOne']>
) => useQuery(['getRoomDetail', id], room.getOne, options)

export const useCreateRoomMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => useMutation(['create'], room.create, options)

export const useJoinRoomMutation = (
  options?: MutationOptions<Response['join'], Variables['join']>
) => useMutation(['join'], room.join, options)

export const useKickMemberMutation = (
  options?: MutationOptions<Response['kick'], Variables['kick']>
) => useMutation(['kick'], room.kick, options)

export const useUpdateReadyStatusMutation = (
  options?: MutationOptions<
    Response['updateReadyStatus'],
    Variables['updateReadyStatus']
  >
) => useMutation(['updateReadyStatus'], room.updateReadyStatus, options)
