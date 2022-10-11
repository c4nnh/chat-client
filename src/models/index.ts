// Common
export type ErrorResponse = {
  error: string
  message: string
  statusCode: number
}

export type ThemeProps = {
  theme: {
    color: string
    bgColor: string
  }
}

type Pagination = {
  total: number
  totalPage: number
}

export type Collection<T> = {
  data: T[]
  pagination: Pagination
}

export type PaginationParams = {
  limit?: number
  offset?: number
}

// Auth
export type Token = {
  accessToken: string
  refreshToken: string
}

export type LoginPayload = {
  usernameOrEmail: string
  password: string
}

export type LoginResponse = {
  user: User
  token: Token
}

export type RegisterPayload = {
  email: string
  name: string
  password: string
}

export type RegisterResponse = LoginResponse

export type RefreshTokenResponse = {
  token: Token
}

// Model
export type User = {
  id: string
  name: string
  email: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export type UpdateUserDto = Partial<Pick<User, 'image'>>

export type Contact = Pick<User, 'id' | 'name' | 'image' | 'email'>

export type ContactParams = PaginationParams & {
  email?: string
}

export type Message = {
  id: string
  content: string
  creator: Pick<User, 'id' | 'name' | 'image'>
  conversation: Pick<Conversation, 'id' | 'name' | 'image'>
  createdAt: Date
  // readBy: Pick<User, 'id' | 'image'>[]
}

export type SendingMessage = Pick<Message, 'content'> & {
  id: number
  isSending?: boolean
  isFailed?: boolean
}

export type CreateMessageDto = {
  content: string
  conversationId: string
}

export type MessagesParams = PaginationParams & {
  conversationId: string
}

export type MessageGroup = {
  creator: Pick<User, 'id' | 'name' | 'image'>
  messages: Message[]
}

export type Conversation = {
  id: string
  name: string
  image?: string
  lastMessage: Message
}

export type ConversationParams = PaginationParams & {
  name?: string
}

export type CreateConversationDto = {
  userIds: string[]
  content: string
}

export type UpdateConversationDto = {
  name?: string
  image?: string
}

export enum GameType {
  BUNNY_JUMP = 'BUNNY_JUMP',
}

export enum RoomRole {
  CREATOR = 'CREATOR',
  MEMBER = 'MEMBER',
}

export type RoomMember = Pick<User, 'id' | 'name' | 'image'> & {
  role: RoomRole
  isReady: boolean
}

type MaxMemberInRoom = 2 | 3 | 4

export type RoomsParams = PaginationParams & {
  gameType: GameType
  name?: string
}

export type Room = {
  id: string
  name?: string
  hasPassword: boolean
  max: MaxMemberInRoom
  game: GameType
  numberOfMember: number
}

export type CreateRoomDto = Pick<Room, 'max' | 'name'> & {
  password?: string
}

export type JoinRoomDto = {
  password: string
}

export type KickMemberDto = {
  roomId: string
  memberId: string
}

export type RoomDetail = {
  id: string
  name?: string
  game: GameType
  members: RoomMember[]
}

// Image
export enum ImageFolder {
  AVATAR_FOLDER = 'avatars',
  MESSAGE_FOLDER = 'messages',
  CONVERSATION_FOLDER = 'conversations',
}
