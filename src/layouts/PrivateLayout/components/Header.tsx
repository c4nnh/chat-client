import { LogoutOutlined, MessageOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useAuthStore } from '../../../stores'

type Props = {}

export const Header: React.FC<Props> = () => {
  const { logout } = useAuthStore()

  return (
    <Container>
      <div className="flex items-center gap-2">
        <MessageOutlined className="text-2xl text-red-500 flex justify-center" />
        <span className="text-2xl font-bold">Chat with your friends</span>
      </div>
      <LogoutOutlined onClick={logout} />
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-12 flex items-center justify-between gap-2 px-5 py-2`}
`
