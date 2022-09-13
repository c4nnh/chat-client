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
  username?: string
  image?: string
  createdAt: Date
  updatedAt: Date
  theme: Theme
}

export type Message = {
  id: string
  content: string
  sender: Pick<User, 'id' | 'name'>
  createdAt: Date
  readBy: Pick<User, 'id' | 'image'>[]
}

export type Conversation = {
  id: string
  title: string
  image?: string
  lastMessage: Message
}
