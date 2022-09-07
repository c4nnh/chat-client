import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import classnames from 'classnames'
import { EditFilled, StepBackwardOutlined } from '@ant-design/icons'
import { ThemeProps } from '../../../models'

type Props = {}

export const SideBar: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(true)

  const collapseSidebar = () => setIsOpen(!isOpen)

  return (
    <Container
      className={classnames({
        'is-open': isOpen,
      })}
    >
      <Header
        className={classnames({
          'is-open': isOpen,
        })}
      >
        {isOpen && (
          <>
            <div />
            <span className="font-semibold text-lg">Messenger</span>
          </>
        )}
        <EditFilled className="text-lg cursor-pointer" />
      </Header>
      <Body>Body</Body>
      <Footer onClick={collapseSidebar}>
        <StepBackwardOutlined
          className={classnames({
            'is-open': isOpen,
          })}
        />
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-col border-r-[1px] border-gray-200 w-80`}
  transition: 0.5s;

  :not(.is-open) {
    ${tw`w-20`}
    transition: 0.5s;
  }
`

const Header = styled.div`
  ${tw`h-10 flex gap-2 px-3 justify-between items-center`};
  background-color: ${(p: ThemeProps) => p.theme.bgColor};
  color: ${(p: ThemeProps) => p.theme.color};

  :not(.is-open) {
    justify-content: center;
  }
`
const Body = styled.div`
  ${tw`flex-1`}
`

const Footer = styled.div`
  ${tw`h-10 flex justify-center items-center cursor-pointer`};
  background-color: ${(p: ThemeProps) => p.theme.bgColor};
  color: ${(p: ThemeProps) => p.theme.color};

  .is-open {
    transform: rotate(0);
    transition: 0.5s;
  }

  span {
    transform: rotate(180deg);
    transition: 0.5s;
  }
`
