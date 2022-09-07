import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Sidebar } from './components'
import { Header } from './components/Header'

type Props = PropsWithChildren

export const PrivateLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Body>
        <Sidebar />
        {children}
      </Body>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-col h-full`}
`

const Body = styled.div`
  ${tw`flex flex-1`}
`
