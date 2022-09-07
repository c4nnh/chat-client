import {
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useAuthStore } from '../../../stores'

type Props = {}

export const Header: React.FC<Props> = () => {
  const { user, logout } = useAuthStore()

  return (
    <Container theme={user?.theme}>
      <div className="flex items-center gap-2">
        <MessageOutlined className="text-2xl flex justify-center" />
        <span className="text-2xl font-bold">Chat with your friends</span>
      </div>
      <StyledDropdown
        trigger={['click']}
        className="cursor-pointer"
        arrow
        overlay={
          <StyledMenu
            theme={user?.theme}
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
      </StyledDropdown>
    </Container>
  )
}

type ThemeProps = {
  theme: {
    color: string
    bgColor: string
  }
}

const Container = styled.div<ThemeProps>`
  ${tw`h-12 flex items-center justify-between gap-2 px-5 py-2`};
  color: ${(p: ThemeProps) => p.theme.color};
  background-color: ${(p: ThemeProps) => p.theme.bgColor};
`

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown {
    .ant-dropdown-arrow {
      background-color: ${(p: ThemeProps) => p.theme.bgColor};
      ::before {
        background: unset;
      }
    }
  }
`

const StyledMenu = styled(Menu)<ThemeProps>`
  background-color: ${(p: ThemeProps) => p.theme.bgColor};

  .ant-dropdown-menu-item {
    color: ${(p: ThemeProps) => p.theme.color};
  }
`
