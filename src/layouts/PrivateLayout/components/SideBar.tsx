import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import classnames from 'classnames'
import { StepBackwardOutlined } from '@ant-design/icons'

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
      <Header>Header</Header>
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

  :not(.is-open) {
    ${tw`w-20`}
    transition: 1s;
  }
  transition: 1s;
`

const Header = styled.div`
  ${tw`h-10 bg-red-200`}
`
const Body = styled.div`
  ${tw`flex-1`}
`

const Footer = styled.div`
  ${tw`h-10 bg-red-200 flex justify-center items-center`}

  .is-open {
    transform: rotate(0);
    transition: 1s;
  }

  span {
    transform: rotate(180deg);
    transition: 1s;
  }
`