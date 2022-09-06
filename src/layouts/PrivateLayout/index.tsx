import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { SideBar } from './components'

type Props = PropsWithChildren

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <SideBar />
      {children}
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex h-full`}
`
