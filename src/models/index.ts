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

// Model
export type Theme = {
  color: string
  bgColor: string
}

export type User = {
  id: string
  name: string
  email: string
  image?: string
  createdAt: Date
  updatedAt: Date
  theme: Theme
}

export type Contact = Pick<User, 'id' | 'name' | 'image' | 'email'>

export type ContactParams = PaginationParams & {
  email?: string
}

export type Message = {
  id: string
  content: string
  creator: Pick<User, 'id' | 'name'>
  createdAt: Date
  readBy: Pick<User, 'id' | 'image'>[]
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
