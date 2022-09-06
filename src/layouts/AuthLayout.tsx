import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = PropsWithChildren

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  ${tw`h-full flex items-center justify-center`}
`
