import {
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Avatar, Modal } from 'antd'
import classnames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'
import { GameIcon } from '../../assets'
import { END_POINTS } from '../../constants'
import { useAuthStore } from '../../stores'

type MenuItem = {
  icon: React.ReactNode
  path?: string
  onClick?: () => void
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { user, logout } = useAuthStore()

  const menuItems: MenuItem[] = [
    {
      icon: <MessageOutlined />,
      path: END_POINTS.PRIVATE.MESSAGE,
    },
    {
      icon: <GameIcon stroke="white" />,
      path: END_POINTS.PRIVATE.GAME.MASTER,
    },
    {
      icon: <UserOutlined />,
      path: END_POINTS.PRIVATE.PROFILE,
    },
    {
      icon: <SettingOutlined />,
      path: END_POINTS.PRIVATE.SETTING,
    },
    {
      icon: <LogoutOutlined />,
      onClick: () => {
        Modal.confirm({
          title: 'Do you want to logout?',
          // icon: <WarningOutlined />,
          okText: 'Yes',
          cancelText: 'No',
          onOk: () => {
            logout()
            navigate(END_POINTS.AUTH.MASTER)
          },
        })
      },
    },
  ]

  return (
    <Container>
      <AvatarContainer>
        <Avatar src={user?.image} size="large" />
      </AvatarContainer>
      <StyledMenu>
        {menuItems.map((item, index) => (
          <StyledMenuItem
            key={index}
            onClick={
              item.path
                ? () => navigate(item.path || '', { replace: true })
                : item.onClick
            }
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
  ${tw`px-2 py-4 text-white text-xl w-full flex justify-center`};
  transition: background-color 0.5s;
  :hover {
    ${tw`bg-gray-800`}
  }

  &.selected {
    ${tw`bg-gray-800`}
  }
`
