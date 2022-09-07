import {
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ThemeProps } from '../../../models'
import { useAuthStore } from '../../../stores'

type Props = {}

export const Header: React.FC<Props> = () => {
  const { user, logout } = useAuthStore()

  return (
    <Container>
      <div className="flex items-center gap-2">
        <MessageOutlined className="text-2xl flex justify-center" />
        <span className="text-2xl font-bold">Chat with your friends</span>
      </div>
      <Dropdown
        trigger={['click']}
        className="cursor-pointer"
        overlay={
          <StyledMenu
            items={[
              {
                label: 'Account',
                key: 'account',
                icon: <UserOutlined />,
              },
              {
                type: 'divider',
              },
              {
                label: 'Logout',
                key: 'logout',
                icon: <LogoutOutlined />,
                onClick: logout,
              },
            ]}
          />
        }
      >
        <div className="flex items-center gap-2">
          <Avatar src={user?.image} />
          <span>{user?.name}</span>
        </div>
      </Dropdown>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-12 flex items-center justify-between gap-2 px-5 py-2`};
  color: ${(p: ThemeProps) => p.theme.color};
  background-color: ${(p: ThemeProps) => p.theme.bgColor};
`

const StyledMenu = styled(Menu)`
  background-color: ${(p: ThemeProps) => p.theme.bgColor};

  .ant-dropdown-menu-item {
    color: ${(p: ThemeProps) => p.theme.color};
  }
`
