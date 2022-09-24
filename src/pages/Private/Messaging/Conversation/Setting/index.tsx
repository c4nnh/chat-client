import { StepBackwardOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {}

export const Setting: React.FC<Props> = () => {
  const [close, setClose] = useState(false)

  const collapseSidebar = () => setClose(!close)

  return (
    <Container
      className={classnames({
        close: close,
      })}
    >
      <Body>Body</Body>
      <Footer onClick={collapseSidebar}>
        <StyledStepBackwardIcon
          className={classnames({
            close: close,
          })}
        />
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-col border-r-[1px] border-gray-200 w-80`}

  &.close {
    ${tw`w-20`}
  }

  transition: 0.5s;
`

const Body = styled.div`
  ${tw`flex-1`}
`

const Footer = styled.div`
  ${tw`h-14 flex justify-center items-center cursor-pointer`}

  .close {
    transform: rotate(0);
    transition: 0.5s;
  }

  span {
    transform: rotate(180deg);
    transition: 0.5s;
  }
`

const StyledStepBackwardIcon = styled(StepBackwardOutlined)`
  ${tw`text-xl text-gray-400 cursor-pointer`}
`
