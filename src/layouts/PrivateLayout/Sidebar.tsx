import {
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar } from 'antd'
import classnames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { END_POINTS } from '../../constants'
import { useAuthStore } from '../../stores'

type MenuItem = {
  icon: React.ReactNode
  path: string
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { user } = useAuthStore()

  const menuItems: MenuItem[] = [
    {
      icon: <MessageOutlined />,
      path: END_POINTS.PRIVATE.MESSAGE,
    },
    {
      icon: <UserOutlined />,
      path: END_POINTS.PRIVATE.PROFILE,
    },
    {
      icon: <SettingOutlined />,
      path: END_POINTS.PRIVATE.SETTING,
    },
  ]

  return (
    <Container>
      <AvatarContainer>
        <Avatar src={user?.image} size="large" />
      </AvatarContainer>
      <StyledMenu>
        {menuItems.map(item => (
          <StyledMenuItem
            key={item.path}
            onClick={() => navigate(item.path, { replace: true })}
            className={classnames({
              selected: location.pathname.startsWith(`/${item.path}`),
            })}
          >
            {item.icon}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-16 h-full bg-gray-900 flex flex-col gap-3 py-3 items-center`}
`

const AvatarContainer = styled.div`
  ${tw`flex justify-center w-3/4 pb-3`};
  border-bottom: 1px solid ${theme`colors.gray.700`};
`

const StyledMenu = styled.div`
  ${tw`flex flex-col w-full flex-1 cursor-pointer gap-2`};
`

const StyledMenuItem = styled.div`
  ${tw`px-2 py-4 text-white text-xl w-full flex justify-center`}

  &.selected {
    ${tw`bg-gray-800`}
  }
`
